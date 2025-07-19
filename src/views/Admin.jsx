import React, { useState, useEffect } from 'react';
import ProductList from "../components/ProductList.jsx";

import inRainbows from "../assets/img/Inrainbowscover.png";
import "../assets/css/admin.css";

const Admin = ({isAdmin}) => {
    const [products, setProductos] = useState([
        { id: 1, title: 'In Rainbows',subtitle:'Radiohead',imageSrc:inRainbows,price: 80.000, genero:"Alternativo"},
       
    ]);

    const [filtrados, setFiltrados] = useState([]);
    const [busquedaProduct, setBusquedaProduct] = useState({ id: '', title: '', subtitle: '', price: '', imageSrc: '' });
    const [editingProduct, setEditing] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [newProduct, setNewProduct] = useState({
        id: '',
        title: '',
        subtitle: '',
        description: '',
        price: '',
        genero: '',
        stock: ''
      });
      


    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleChangeBusqueda = (e) => {
        const { name, value } = e.target;
        setBusquedaProduct({ ...busquedaProduct, [name]: value });
    };
    const handleSearch = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/vinilos", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            if (!response.ok) {
                const text = await response.text();
                console.error("Error del backend:", text);
                throw new Error("Error al buscar vinilos");
            }
    
            const data = await response.json();
            const vinilos = data.content; // 👈 así accedés a la lista
    
            const resultadoFiltrado = vinilos.filter(product =>
                product.title.toLowerCase().includes(busquedaProduct.title.toLowerCase())
            );
    
            setFiltrados(resultadoFiltrado);
            setEditing(true);
        } catch (error) {
            console.error("Error al buscar vinilos:", error);
            alert("Error al encontrar vinilos");
        }
    };
    
    

    const handleEliminar =  async (productToDelete) => {
        console.log("Eliminando producto con ID:", productToDelete);
        
        try {
        console.log('token:', localStorage.getItem('token'));
           const response = await fetch(`http://localhost:8080/api/vinilos/delete/${productToDelete}`, {
             method: "DELETE",
             headers: {
                 "Authorization": `Bearer ${localStorage.getItem('token')}`,  // 👈 así se manda el token
               },
           });
       
           if (!response.ok) {
             const text = await response.text();
             console.error("Error del backend:", text);
             throw new Error("Error al eliminar vinilo");
           }
           console.log("Producto eliminado exitosamente");
       
         } catch (error) {
           console.error("Error al eliminar vinilo:", error);
           alert("Error al eliminar vinilo");
         }
         setProductos(prevItems => prevItems.filter(item => item.id !== productToDelete));
        handleSearch();
    
        return products;
    };
    

    const handleAgregar = async () => {
        const formData = new FormData();
        formData.append("title", newProduct.title);
        formData.append("subtitle", newProduct.subtitle);
        formData.append("description", newProduct.description);
        formData.append("price", parseFloat(newProduct.price));
        formData.append("genero", newProduct.genero);
        formData.append("stock", parseInt(newProduct.stock));
        formData.append("imageFile", imageFile);


        console.log("Contenido del FormData:");
  for (let pair of formData.entries()) {
    if (pair[1] instanceof File) {
      console.log(`${pair[0]}:`, pair[1].name);
    } else {
      console.log(`${pair[0]}:`, pair[1]);
    }
  }
      
        try {
           console.log('token:', localStorage.getItem('token'));
          const response = await fetch("http://localhost:8080/api/vinilos/add-vinilo", {
            method: "POST",
            body: formData,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,  // 👈 así se manda el token
              },
          });
          
      
          if (!response.ok) {
            const text = await response.text();
            console.error("Error del backend:", text);
            throw new Error("Error al agregar vinilo");
          }
      
          console.log("Producto agregado exitosamente");
        } catch (error) {
          console.error("Error al subir vinilo:", error);
          alert("Error al subir vinilo");
        }
      };
      
      

    const handleEdit = (productId, field, value) => {
        const productosActualizados = products.map(product =>
            product.id === productId ? { ...product, [field]: value } : product
        );
        setProductos(productosActualizados);
        handleSearch();
    };

    useEffect(() => {
        if (editingProduct === true)
            handleSearch();
        console.log(products);
    }, [products]);

    if (!isAdmin) {
        return null; 
    }

    return (
        <div className='admin'>
            <h2 className="ps-4 pb-4">Admin</h2>
            <section className='admin-filter'>
                <h3>Filtrar Productos</h3>
                <input type="text" name="title" placeholder="Título" value={busquedaProduct.title} onChange={handleChangeBusqueda}/>
                <button type='button' onClick={handleSearch} >Buscar Albúm</button>
                {filtrados.map(product => (
                    <ProductList
                    key={product.id}
                    imageSrc={`data:image/jpeg;base64,${product.image}`} // 👈 importante para mostrar base64
                    title={product.title}
                    subtitle={product.subtitle}
                    price={product.price}
                    showEdit={true} 
                    handleEdit={(field, value) => handleEdit(product.id, field, value)} 
                    handleClick={() => handleEliminar(product.id)} 
                  />
                  
                ))}

            </section>
            <section id="admin-form-new" className="background-color-1 admin-section-new w-100">
                    <h3>Agregar Nuevo Producto</h3>
                    <form className="py-2">
                            <input type="text" name="title" placeholder="Título" value={newProduct.title} onChange={handleChange} />
                            <input type="text" name="subtitle" placeholder="Artista" value={newProduct.subtitle} onChange={handleChange} />
                            <input type="text" name="description" placeholder="Descripción" value={newProduct.description} onChange={handleChange} />
                            <input type="number" name="price" placeholder="Precio" value={newProduct.price} onChange={handleChange} />
                            <input type="text" name="genero" placeholder="Género" value={newProduct.genero} onChange={handleChange} />
                            <input type="number" name="stock" placeholder="Stock" value={newProduct.stock} onChange={handleChange} />
                            <input
                                type="file"
                                name="imageFile"
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files[0])}
                            />


                            </form>
                    <button type="button" onClick={handleAgregar}>Agregar Vinilo</button>
            </section>
        {/*
        <section className='admin-eliminar-prod'>
        <h3>Eliminar Producto</h3>
                <form>
                    <input type="text" name="title" placeholder="Título" value={newProduct.title} onChange={handleChange}/>
                    <input type="text" name="subtitle" placeholder="Artista" value={newProduct.subtitle} onChange={handleChange} />
                    <input type="text" name="price" placeholder="Precio" value={newProduct.price} onChange={handleChange}  />
                    <input type="text" name="imageSrc" placeholder="URL de la imagen" value={newProduct.imageSrc} onChange={handleChange} />
                    <button type="submit" onClick={handleClick}>Agregar Vinilo</button>
                </form>
        </section>*/}
        </div>
    );
}

export default Admin;