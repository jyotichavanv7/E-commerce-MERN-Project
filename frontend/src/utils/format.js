export function money(value) {
  return '$' + Number(value).toFixed(2)
}

export function imageUrl(image) {
  if (!image) return ''
  if (image.startsWith('http')) return image
  return 'https://images.unsplash.com/' + image + '?auto=format&fit=crop&w=900&q=85'
}
