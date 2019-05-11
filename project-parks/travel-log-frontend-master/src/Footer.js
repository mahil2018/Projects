import React, { Component } from 'react';


class Footer extends Component {

    render(){
        return (
                // {/* Footer */}
            <footer className="page-footer font-small special-color-dark pt-4">
            {/* Footer Elements */}
            {/* <!-- Add font awesome icons --> */}
                <a href="#" class="fa fa-facebook"></a>
                <a href="#" class="fa fa-twitter"></a>
            {/* Footer Elements */}
            {/* Copyright */}
            <div className="footer-copyright text-center py-3">© 2018 Copyright:
                <a href="https://mdbootstrap.com/education/bootstrap/"> Miller Rosas</a>
            </div>
            {/* Copyright */}
            </footer>
            // {/* Footer */}



        )
  }
}

export default Footer;
