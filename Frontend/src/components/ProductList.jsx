import React, { useState } from 'react';
import  "../assets/css/styles.css";

function ProductList({id,imageSrc, title, subtitle, price,handleClick,handleEdit}) {

  const [valoresEdit, setValoresEdit] = useState({ title, subtitle, price });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValoresEdit({ ...valoresEdit, [name]: value });
    };

    const handleSave = () => {
        handleEdit(id,valoresEdit);
    };
    
    
  return (
    <div className="product-list d-flex align-items-center background-white-2 h-auto">
      <img
  src={imageSrc?.startsWith('data:image') ? imageSrc : `data:image/jpeg;base64,${imageSrc}`}
  alt={title}
  style={{ width: "100px", height: "100px", borderRadius: "300", borderRadius: "80px" }}
  
/>

      {handleEdit ? (
                    <>
                        <input type="text" name="title" value={valoresEdit.title} onChange={handleInputChange} />
                        <input type="text" name="subtitle" value={valoresEdit.subtitle} onChange={handleInputChange} />
                        <input type="number" name="price" value={valoresEdit.price} onChange={handleInputChange} />
                        <button onClick={handleSave}>Guardar</button>
                        <button className="delete-button d-flex align-items-center justify-content-center" onClick={handleClick}>X</button>
                    </>
                ) : (
                    <>
                        <p className="product-list-info ms-2">{title}</p>
                        <p className="product-list-info">{subtitle}</p>
                        <p className="product-list-info price">$ {price}</p>
                        <button className="delete-button d-flex align-items-center justify-content-center" onClick={handleClick}>X</button>
                    </>
                )}
    </div>
  );
}

export default ProductList;
