'use client'

import { Link } from '@/site/lib/router'

import { GradientButton } from '@/site/components/ui/gradient-button'
import { useSiteData } from '@/site/lib/site-data'
import { useSiteLang, useT } from '@/site/lib/lang'

/** `bare`: just the cards, to sit inside another section that already has its own heading and spacing. */
export function ProductsGrid({ bare = false }: { bare?: boolean } = {}) {
  const { products } = useSiteData().content
  const t = useT()
  const en = useSiteLang().lang === 'en'
  return (
    <section
      id={bare ? undefined : 'products'}
      className={bare ? 'text-left' : 'container scroll-mt-24 py-20 md:py-28'}
    >
      {!bare && (
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 eyebrow">
            BeSight Indicators
          </p>
          <h2 className="text-3xl font-semibold leading-snug tracking-tight md:text-4xl md:leading-snug lg:text-5xl lg:leading-snug">
            {t('เครื่องมือวิเคราะห์ที่สร้างมา', 'Analysis tools built')}
            <br />
            {t('เพื่อการเทรดที่แม่นยำยิ่งขึ้น', 'for more precise trading')}
          </h2>
        </div>
      )}

      <div className={`${bare ? 'mt-12' : 'mt-14'} grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12 lg:grid-cols-3`}>
        {products.map((product) => (
          <div key={product.handle} className="flex h-full flex-col">
            <div className="relative">
              <img
                src={product.image}
                alt={en && product.titleEn ? product.titleEn : product.title}
                className={`aspect-square w-full rounded-2xl object-cover shadow-lg transition-shadow hover:shadow-xl ${product.status === 'soon' ? 'opacity-60 grayscale-[35%]' : ''}`}
              />
              {product.status === 'soon' && (
                <span className="absolute left-3 top-3 rounded-full bg-navy px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white md:text-xs">
                  Coming soon
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col">
              <h3 className="mt-3 text-sm font-semibold sm:text-lg md:mt-5 md:text-2xl">
                {en && product.titleEn ? product.titleEn : product.title}
              </h3>
              {product.description ? (
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm md:text-base">
                  {en && product.descriptionEn ? product.descriptionEn : product.description}
                </p>
              ) : (
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm md:text-base">
                  <span className="font-semibold text-foreground">
                    ${product.price}
                  </span>{' '}
                  per month
                </p>
              )}
            </div>
            {product.status === 'soon' ? (
              <span className="mt-3 block w-full cursor-default rounded-full border-2 border-dashed border-zinc-900/15 px-3 py-2 text-center text-xs font-medium text-muted-foreground sm:text-sm md:mt-4 md:py-2.5">
                {t('เร็ว ๆ นี้', 'Coming soon')}
              </span>
            ) : (
              /* Every live tool has a details page (CRM → Website → Tools); a
                 custom link, if set, points somewhere else instead. */
              <GradientButton
                asChild
                className="mt-3 block w-full md:mt-4"
                innerClassName="px-3 py-2 text-xs sm:text-sm md:px-6 md:py-2.5 md:text-sm"
              >
                {(() => {
                  const href = product.landingPath || `/indicators/${product.handle}`
                  const external = /^https?:\/\//i.test(href)
                  return (
                    <Link to={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      {(en && product.ctaEn ? product.ctaEn : product.cta) ?? 'Get Started'}
                    </Link>
                  )
                })()}
              </GradientButton>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
