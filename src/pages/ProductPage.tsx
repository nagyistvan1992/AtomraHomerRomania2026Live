const handleAddToCart = () => {
  if (!product) return;
     
    // Use product slug as ID for better Stripe integration
    // This ensures we can match cart items to Stripe products
    addItem({
      id: product.slug, // Use slug as the unique identifier
      name: product.name,
      price: `${product.price.toFixed(0)} Lei`,
      image: product.images && product.images.length > 0 ? product.images[0] : '/placeholder-image.jpg',
      category: product.category,
      quantity: quantity  // Pass quantity to addItem
    });
    
    // Show success animation
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
}