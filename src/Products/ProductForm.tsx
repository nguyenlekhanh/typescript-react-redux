import React from 'react'

const ProductForm = () => {
  return (<>
    <h2>Add Game To Cart</h2>
    <form>
        <input type="text" placeholder="Game title" name="title"/>
        <input type="number" placeholder="Price" name="price"/>
        <input type="text" placeholder="id" name="id"/>
        <button>Add Price</button>
    </form>
    </>
  )
}

export default ProductForm