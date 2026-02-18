'use client'

import { useState } from 'react'
import { Product } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2, RotateCcw } from 'lucide-react'
import { EditProductDialog } from './edit-product-dialog'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

interface ProductRowActionsProps {
  product: Product
}

export function ProductRowActions({ product }: ProductRowActionsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleArchive = async (id: string, name: string) => {
    if (!confirm(`Archive "${name}"? It won't be deleted, it will just be hidden from customers.`)) return

    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          variant: 'success',
          title: 'Product archived',
          description: `${name} was archived successfully`,
        })
        router.refresh()
      } else {
        throw new Error('Failed to archive product')
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not archive the product',
      })
    }
  }

  const handleRestore = async (id: string, name: string) => {
    try {
      const response = await fetch(`/api/products/restore?id=${id}`, {
        method: 'POST',
      })

      if (response.ok) {
        toast({
          variant: 'success',
          title: 'Product restored',
          description: `${name} is visible again`,
        })
        router.refresh()
      } else {
        throw new Error('Failed to restore product')
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not restore the product',
      })
    }
  }

  return (
    <div className="flex items-center justify-end gap-2">
      {product.isActive ? (
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-400 hover:text-red-300 hover:border-red-400"
            onClick={() => handleArchive(product.id, product.name)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </>
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="text-green-400 hover:text-green-300 hover:border-green-400 gap-1"
          onClick={() => handleRestore(product.id, product.name)}
        >
          <RotateCcw className="w-4 h-4" />
          Restore
        </Button>
      )}

      {isEditing && (
        <EditProductDialog
          product={product}
          open={isEditing}
          onOpenChange={setIsEditing}
        />
      )}
    </div>
  )
}
