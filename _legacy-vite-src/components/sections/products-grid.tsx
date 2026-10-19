import { Link } from 'react-router-dom'

import { GradientButton } from '@/components/ui/gradient-button'
import { products } from '@/data/products'

export function ProductsGrid() {
  return (
    <section id="products" className="container scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          BeSight Indicators
        </p>
        <h2 className="text-3xl font-semibold leading-snug tracking-tight md:text-4xl md:leading-snug lg:text-5xl lg:leading-snug">
          เครื่องมือวิเคราะห์ที่สร้างมา
          <br />
          เพื่อการเทรดที่แม่นยำยิ่งขึ้น
        </h2>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.handle} className="flex h-full flex-col">
            <img
              src={product.image}
              alt={product.title}
              className="aspect-square w-full rounded-2xl object-cover shadow-lg transition-shadow hover:shadow-xl"
            />
            <div className="flex flex-1 flex-col">
              <h3 className="mt-3 text-sm font-semibold sm:text-lg md:mt-5 md:text-2xl">
                {product.title}
              </h3>
              {product.description ? (
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm md:text-base">
                  {product.description}
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
            {product.landingPath ? (
              <GradientButton
                asChild
                className="mt-3 block w-full md:mt-4"
                innerClassName="px-3 py-2 text-xs sm:text-sm md:px-6 md:py-2.5 md:text-sm"
              >
                <Link to={product.landingPath}>{product.cta ?? 'Get Started'}</Link>
              </GradientButton>
            ) : (
              <GradientButton
                type="button"
                className="mt-3 block w-full md:mt-4"
                innerClassName="px-3 py-2 text-xs sm:text-sm md:px-6 md:py-2.5 md:text-sm"
              >
                {product.cta ?? 'Get Started'}
              </GradientButton>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
