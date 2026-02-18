import { Product } from '@prisma/client'
import { formatPrice } from '@/lib/utils'
import { Archive } from 'lucide-react'
import { ProductRowActions } from './product-row-actions'

interface ProductTableProps {
  products: Product[]
}

export function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Product</th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Category</th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Price</th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Stock</th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Status</th>
            <th className="text-right py-4 px-4 text-sm font-semibold text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className={`border-b border-border/50 hover:bg-card/50 transition-colors ${
                !product.isActive ? 'opacity-50' : ''
              }`}
            >
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-400 line-clamp-1">{product.description}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-card border border-border">
                  {product.category}
                </span>
              </td>
              <td className="py-4 px-4 font-bold text-neon">{formatPrice(product.price)}</td>
              <td className="py-4 px-4">
                <span
                  className={`font-semibold ${
                    product.stock === 0 ? 'text-red-400' : product.stock <= 10 ? 'text-yellow-400' : 'text-green-400'
                  }`}
                >
                  {product.stock}
                </span>
              </td>
              <td className="py-4 px-4">
                {product.isActive ? (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-gray-500/10 text-gray-400 border border-gray-500/20">
                    <Archive className="w-3 h-3" />
                    Archived
                  </span>
                )}
              </td>
              <td className="py-4 px-4">
                <ProductRowActions product={product} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {products.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p>No products yet</p>
        </div>
      )}
    </div>
  )
}
