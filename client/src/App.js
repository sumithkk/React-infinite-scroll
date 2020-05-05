import React, { useReducer, useRef } from 'react';
import { useFetch, useInfiniteScroll, useLazyLoading, useSignUpForm } from './customHooks';
import './index.css';
import logo from "./nykaa_logo.svg";
import ScrollTopArrow from "./ScrollTopArrow"

function App() {
  const imgReducer = (state, action) => {
    switch (action.type) {
      case 'STACK_PRODUCTS':
        if (action.search) {
          return { ...state, products: action.products }
        } else {
          return { ...state, products: state.products.concat(action.products) }
        }
      case 'FETCHING_IMAGES':
        return { ...state, fetching: action.fetching }
      default:
        return state;
    }
  }
  const pageReducer = (state, action) => {
    switch (action.type) {
      case 'ADVANCE_PAGE':
        return { ...state, page: state.page + 1 }
      case 'SEARCH_PAGE':
        return { ...state, page: 0, search: action.search }
      default:
        return state;
    }
  }

  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0, search: "" })
  const [prodData, imgDispatch] = useReducer(imgReducer, { products: [], fetching: true, search: false })
  const { inputs, handleInputChange, handleSubmit } = useSignUpForm(pagerDispatch);

  let bottomBoundaryRef = useRef(null);
  let searchRef = useRef(null);
  useFetch({ pager }, imgDispatch);
  useLazyLoading('.card-img-top', prodData.products)
  useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

  return (
    <div className="">
      <nav className="navbar bg-light fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/#" style={{ borderBottom: "1px solid #dedede" }}>
            <img src={logo} width="100px" alt="logo" />
          </a>
          <form style={{ width: "50%" }} onSubmit={handleSubmit}>
            <input className="search" type="text" placeholder="Search" ref={searchRef} onChange={handleInputChange} name="search" value={inputs.search} />
          </form>
        </div>
      </nav>

      <div id='images' className="container" style={{ marginTop: "100px" }}>
        <div className="row">
          {prodData.products.length > 0 ? prodData.products.map((image, index) => {
            const { title, imageUrl, subTitle, sizeVariation } = image
            return (
              <div key={index} className="card">
                <div className="card-body ">
                  <img
                    alt={title}
                    data-src={imageUrl}
                    className="card-img-top"
                    src={'https://picsum.photos/id/870/300/300?grayscale&blur=2'}
                  />
                </div>
                <div className="card-footer">
                  <p className="card-text text-primary">{title}</p>
                  <p className="card-text text-secondary">{subTitle}</p>
                  <div style={{ display: "flex", fontSize: "13px", flexWrap: "wrap" }}>
                    {sizeVariation.map((v, i) => (
                      <span key={i}>{v.title}, </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          }) : (<div className="container text-center loader m-auto p-3 pos-abs">No products found for <strong>{inputs.search}</strong>. <span className="showAll" onClick={() => window.location.reload()}>show all products</span></div>)}
        </div>
      </div>
      <ScrollTopArrow />
      {prodData.fetching && (
        <div className="container" style={{ minHeight: "400px" }}>
          <div className="container text-center loader m-auto p-3 pos-abs">
            <p className="m-0">Fetching Products</p>
          </div>
        </div>
      )}
      <div id='page-bottom-boundary' ref={bottomBoundaryRef}></div>
    </div>
  );
}

export default App;
