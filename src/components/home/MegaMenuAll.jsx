import axios from 'axios';
import React, { Component } from 'react'
import SideMenuIcon from '../../assets/images/3917525.svg'
import APPURL from '../../api/AppURL';
import { Link } from 'react-router-dom';

class MegaMenuAll extends Component {
     constructor() {
          super();
          this.state = {
               MenuData: []
          }
     }

     componentDidMount() {
          axios.get(APPURL.Allcategory).then(response => {
               this.setState({ MenuData: response.data });
          })
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
          const CatList = this.state.MenuData;

          const Myview = CatList.map((CatList, i) => {
               return <div key={i.toString()}>
                    <button onClick={this.menuItemClick} className="accordionAll">
                         <img className="accordionMenuIconAll" src={CatList.category_image} />&nbsp; {CatList.category_name}
                    </button>
                    <div className="panelAll">
                         <ul>
                              {
                                   (CatList.subcategory_name.map((SubCatList,i)=>{
                                        return <li><Link to={"/productsubcategory/"+CatList.category_name+"/"+SubCatList.subcategory_name} className="accordionItem" > {SubCatList.subcategory_name}</Link></li>
                                   }))
                              }
                              
                         </ul>
                    </div>
               </div>
          });

          return (
               <div className="accordionMenuDivAll">
                    <div className="accordionMenuDivInsideAll">
                         {Myview}
                    </div>
               </div>
          )
     }
}

export default MegaMenuAll