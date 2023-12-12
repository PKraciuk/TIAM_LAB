import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Bootsrap.css';
    const Bootstrap = () => {
    return (
        <div className="container">
            <h1 className="text-center">LAB1</h1>
            <p className="lead">Bootstrap</p>

            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <img src="https://via.placeholder.com/150" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card Title</h5>
                            <p className="card-text">Some quick example text to build on the card title.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card">
                        <img src="https://via.placeholder.com/150" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card Title</h5>
                            <p className="card-text">Some quick example text to build on the card title.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card">
                        <img src="https://via.placeholder.com/150" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card Title</h5>
                            <p className="card-text">Some quick example text to build on the card title.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bootstrap;
