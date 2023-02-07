import React from "react";

const Footer = () => {
    return(
        <div style={{backgroundColor:'#2a2a47', height: '5vh'}}>
            <div className="row text-secondary mx-auto" style={{width:'90%'}}>
            <div className="col d-flex justify-content-end mt-2 mt-xxl-3">
            © Cinèra 2023
            </div>
            <div className="col-3 col-md-2 mt-2 mt-xxl-3 d-flex justify-content-center">
                TMDB API
            </div>
            <div className="col-5 mt-2 mt-xxl-3">
                Project by Soumita Basu
            </div>
        </div>
        </div>
    )
}

export default Footer;