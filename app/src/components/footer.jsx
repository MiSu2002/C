import React from "react";

const Footer = () => {
    return(
        <div className="footer">
            <style>
            {`
            .footer{
                height: 5vh;
                background-color: #2a2a47;
            }
            @media screen and (max-width: 768px){
                .footer{
                    height: 7vh;
                }
            }
            `}
        </style>
            <div className="row text-secondary mx-auto" style={{width:'90%'}}>
            <div className="col d-flex justify-content-end mt-2 mt-xxl-3">
            Cinèra &nbsp; © 2023
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