import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useSelector } from 'react-redux';





export const ProdDescripcion = () => {
  const { id } = useParams(); // String
  const product = useSelector(state => state.products.selectedProduct);
  if (!product) return <p>Producto no encontrado</p>;
  console.log(product);

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-4">
          <Card style={{ width: '18rem' }}>
          <Card.Img
                src={`data:image/jpeg;base64,${product.image}`}
                variant="top"
            />
            <Card.Img variant="top" src={product.imageSrc} />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Subtitle>{product.subtitle}</Card.Subtitle>
              <Card.Text>Precio: ${product.price}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-6">
          <div className="d-flex flex-column align-items-center">
            <p>{product.description}</p>
            <Link to="/Products" className="btn btn-primary mt-4">Volver atrás</Link>
          </div>
        </div>
      </div>
    </div>
  );
};