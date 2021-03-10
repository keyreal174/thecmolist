import React from "react";
import "./Homepage.css";
import { privacyPolicy } from "../util/constants";

function Homepage() {
  return (
    <div className="container wrapper__homepage">
      <header>
        <nav className="nav__homepage">
          <a className="nav__logo" href="/">
            CMO<span>list</span>
          </a>
          <div className="btn__homepage-group">
            <a href="/signup" className="btn__homepage btn__homepage-blue">
              Apply now
            </a>
            <a href="/login" className="btn__homepage btn__homepage-white">
              Sign In
            </a>
          </div>
        </nav>

        <div className="banner__homepage">
          <div className="row align-items-center">
            <div className="col-sm-8">
              <h1 className="banner__header">
                The private network for the world's leading marketing executives
              </h1>
              <p>
                Connect with your peers to learn from each other, find proven
                vendors, and stay connected to the rapidly evolving world of
                modern marketing
              </p>
            </div>
            <div className="col-sm-4">
              <div className="banner__img">
                <img
                  className="img__homepage"
                  src="/images/banner.png"
                  alt=""
                ></img>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="services__homepage">
        <div className="row no-gutters__homepage">
          <div className="col-md-4">
            <div className="services-item">
              <div>
                <h2>CMOs &amp; Marketing Executives</h2>
                <p>Create your private network of trusted marketing peers</p>
              </div>
              <a href="/signup" className="btn__homepage btn__homepage-blue">
                Apply
              </a>
            </div>
          </div>
          <div className="col-md-4">
            <div className="services-item">
              <div>
                <h2>Agencies & Marketing Software Firms</h2>
                <p>
                  Find new clients by sharing your engagements and expertise
                </p>
              </div>
              <a href="/signup" className="btn__homepage btn__homepage-blue">
                Apply
              </a>
            </div>
          </div>
          <div className="col-md-4">
            <div className="services-item">
              <div>
                <h2>Marketing professionals & Consultants</h2>
                <p>
                  Get hired by highlighting your work, impact and experience
                </p>
              </div>
              <a href="/signup" className="btn__homepage btn__homepage-blue">
                Apply
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="brands__homepage">
        <div className="row">
          <div className="col">
            <h2 className="brands__title">
              Join marketing executives and alumni from leading companies
              including
            </h2>
            <div className="brands__img">
              <img
                className="img__homepage"
                src="/images/Graphic_4.png"
                alt=""
              ></img>
            </div>
          </div>
        </div>
      </section>

      <section className="about__homepage">
        <div className="about__wrapper">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="brands__info">
                <h2 className="about__title">Knowledge network</h2>
                <p className="brands__desc">
                  Get advice from your peers and stay in touch with the rapidly
                  evolving world of modern marketing.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="hp__img">
                <img
                  className="img__homepage"
                  src="https://d3k6hg21rt7gsh.cloudfront.net/hp_graph1.png"
                  alt=""
                ></img>
              </div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-md-6 order-md-last">
              <div className="brands__info">
                <h2 className="about__title">Trusted reviews</h2>
                <p className="brands__desc">
                  Access the expertise of other marketing leaders to find the
                  best agencies, technology vendors and consultants.
                </p>
              </div>
            </div>
            <div className="col-md-6 order-md-first">
              <div className="hp__img">
                <img
                  className="img__homepage"
                  src="https://d3k6hg21rt7gsh.cloudfront.net/hp_graph3.png"
                  alt=""
                ></img>
              </div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="brands__info brands__desc--right">
                <h2 className="about__title">Project showcase</h2>
                <p className="brands__desc">
                  Review work performed by vendors for other marketing leaders
                  to help you understand their capabilities.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="hp__img">
                <img
                  className="img__homepage"
                  src="https://d3k6hg21rt7gsh.cloudfront.net/hp_graph2.png"
                  alt=""
                ></img>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer__homepage">
        <div className="footer__wrapper">
          <div className="row">
            <div className="col-md-10 order-md-last">
              <ul className="footer__menu">
                <li>
                  <a href="/#">About</a>
                </li>
                <li>
                  <a href="/#">User Agreement</a>
                </li>
                <li>
                  <a href={privacyPolicy}>Privacy Policy</a>
                </li>
                <li>
                  <a href="/#">Copyright Policy</a>
                </li>
                <li>
                  <a href="/#">Help</a>
                </li>
              </ul>
            </div>
            <div className="col-md-2 order-md-first">
              <div className="footer__left">
                <a className="nav__logo" href="/">
                  CMO<span>list</span>
                </a>
                <span className="footer__copyright">&copy; 2020</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;
