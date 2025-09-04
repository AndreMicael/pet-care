"use client"

import Link from 'next/link'
import React from 'react'

interface Cuidador {
  id: number
  title: string
  description: string
  price: number
  image: string
  rating: number
  location: string
  linkForm: string
}

interface ServiceCardProps extends Cuidador {
  handleCuidador: (cuidador: Cuidador) => void
}

const ServiceCard = (props: ServiceCardProps) => {
  const { title, description, price, image, linkForm, rating, location, handleCuidador } = props

  const handleClick = () => {
    handleCuidador(props)
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>)
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">☆</span>)
    }

    return stars
  }

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200"
      onClick={handleClick}
    >
      <div className="p-4">
        <div className="flex items-center mb-3">
          <img 
            src={image} 
            alt={title}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
            {location && (
              <p className="text-sm text-gray-500 mb-2">📍 {location}</p>
            )}
            <div className="flex items-center">
              <div className="flex mr-2">
                {renderStars(rating)}
              </div>
              <span className="text-sm text-gray-600">({rating})</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-green-600">
            R$ {price}
            <span className="text-sm font-normal text-gray-500">/dia</span>
          </div>
          <Link href={linkForm}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Contatar
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard