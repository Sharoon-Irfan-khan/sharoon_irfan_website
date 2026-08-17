'use client';

import Image from 'next/image';
import { useReveal, useLoadMoreRows } from './useReveal';
import { workAsset } from '@/lib/work-assets';
import { socialAccounts } from '@/lib/work-data';

function AccountCard({ account }) {
  const imageBlock = (
    <div className="account-image-wrapper">
      <Image
        src={workAsset(account.img)}
        alt={account.alt}
        className="account-image"
        fill
        sizes="(max-width: 900px) 100vw, 50vw"
        style={{ objectFit: 'contain', objectPosition: 'top center' }}
        loading="lazy"
      />
    </div>
  );
  const contentBlock = (
    <div className="account-content">
      <span className="account-badge">{account.badge}</span>
      <h3 className="account-title">{account.title}</h3>
      <p className="account-role">{account.role}</p>
      <p className="account-description">{account.desc}</p>
      <ul className="account-highlights">
        {account.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className={`social-account account-${account.num}`} data-account={account.num}>
      <div className="account-inner">
        {account.imageFirst ? (
          <>
            {imageBlock}
            {contentBlock}
          </>
        ) : (
          <>
            {contentBlock}
            {imageBlock}
          </>
        )}
      </div>
    </div>
  );
}

export default function SocialAccounts() {
  const ref = useReveal();
  const { gridRef, wrapRef } = useLoadMoreRows(socialAccounts.length, 1);

  return (
    <section
      ref={ref}
      className="social-management-section"
      id="social-management"
      data-screen-label="Social Media Management"
    >
      <div className="wrap">
        <div className="section-header">
          <span className="section-label">04 · Social Media Management</span>
          <h2 className="section-title reveal">
            Building Brands.
            <br />
            Growing Communities.
          </h2>
          <p className="section-subtitle reveal">
            Managing and scaling social media presence across multiple industries — from real
            estate and hospitality to personal branding and luxury brands.
          </p>
        </div>

        <div className="social-accounts" ref={gridRef}>
          {socialAccounts.map((a) => (
            <AccountCard account={a} key={a.num} />
          ))}
        </div>

        <div className="load-more-wrap" ref={wrapRef}>
          <button type="button" className="load-more-btn">
            Load More Accounts
          </button>
        </div>
      </div>
    </section>
  );
}
