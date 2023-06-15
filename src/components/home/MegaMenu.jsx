import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';

class MegaMenu extends Component {

     constructor(props) {
          super();
     }

     menuItemClick=(event)=>{
          event.target.classList.toggle("active");
          var panel = event.target.nextElementSibling;
          if (panel.style.maxHeight) {
               panel.style.maxHeight = null;
          } else {
               panel.style.maxHeight = panel.scrollHeight + "px"
          }
     }


     render() {
          const CatList = this.props.data;

          const MyView = CatList.map((CatList, i) => {
               return <div key={i.toString()}>
                    <button onClick={this.menuItemClick} className="accordion">
                         <img className="accordionMenuIcon" src={CatList.category_image} />&nbsp; {CatList.category_name}
                    </button>
                    <div className="panel">
                         <ul>
                              {
                                   (CatList.subcategory_name).map((SubCatList, i)=>{
                                        return <li key={i.toString()}>
                                             <Link to={"productsubcategory/"+CatList.category_name+"/"+SubCatList.subcategory_name} className="accordionItem" > {SubCatList.subcategory_name}</Link>
                                             </li>
                                   })
                              }
                         </ul>
                    </div>
               </div>
          });
          return (
               <div className="accordionMenuDiv">
                    <div className="accordionMenuDivInside">
                         {MyView}
                    </div>
               </div>
          )
     }
}
export default MegaMenu;