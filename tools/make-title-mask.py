"""
Build the feathered mask used to remove the burned-in "DUBAI / UNITED ARAB
EMIRATES" title from the hero clip.

The title sits dead centre of the frame for the whole shot, over the hand, and
grows more visible as the shot brightens. Three approaches were tried:

  - cropping it out       — removes the subject with it, the text is centred
  - ffmpeg delogo         — leaves a grey block where the text crosses the hand
  - darkening the region  — works while the shot is dark, fails once it brightens

What works is a heavy local blur, feathered at the edges. Blur destroys the
letterforms outright rather than trying to hide them, and because the background
there is a smooth sunset gradient the blurred patch is invisible. Where the text
crosses the hand it softens the silhouette very slightly, which reads as depth
of field rather than as damage.

This writes a greyscale mask: white is where the blur shows through. It is fed to
ffmpeg's alphamerge in tools/make-hero-video.sh.

Run this if the clip timecodes or framing change, then rerun make-hero-video.sh.
"""

import os

from PIL import Image, ImageDraw, ImageFilter

WIDTH, HEIGHT = 1920, 844

# Measured extent of the two title lines in the 1920x844 frame: x 645-1276,
# y 370-531. Padded a little on each side.
#
# This is a rounded rectangle, not an ellipse. An ellipse narrows towards its
# top and bottom edges, which left the ends of "D" and "I" and both ends of the
# subtitle outside the mask and perfectly sharp. Keep it tight regardless — an
# oversized box blurs the hand and the falling sand with it.
BOX = (600, 344, 1322, 560)
RADIUS = 60

# Feather radius. Enough to hide the edge, small enough to stay off the subject.
FEATHER = 34


def build(path: str) -> None:
    mask = Image.new("L", (WIDTH, HEIGHT), 0)
    ImageDraw.Draw(mask).rounded_rectangle(BOX, radius=RADIUS, fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(FEATHER))
    mask.save(path)
    print(f"wrote {path} ({WIDTH}x{HEIGHT})")


if __name__ == "__main__":
    build(os.path.join(os.path.dirname(__file__), "hero-title-mask.png"))
