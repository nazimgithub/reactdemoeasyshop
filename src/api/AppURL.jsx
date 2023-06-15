class APPURL {
  static BaseURL = "http://localhost:8000/api";
  static VistiorDetails = this.BaseURL+"/getvisitor";
  static PostContact = this.BaseURL+"/postcontact";
  static Allsiteinfo = this.BaseURL+"/getsiteinfo";
  static Allcategory = this.BaseURL+"/allcategory";
  static SliderImages = this.BaseURL+"/homeslider";
  static Allnotification = this.BaseURL+"/allnotification";

  static ProductListByRemark(Remark){
    return this.BaseURL+"/productlistbyremark/"+Remark;
  }

  static ProductListByCategory(category){
    return this.BaseURL+"/productlistbycategory/"+category;
  }

  static ProductListBySubcategory(category, subcategory){
    return this.BaseURL+"/productlistbysubcategory/"+category+"/"+subcategory;
  }

  static ProductDetail(productId){
    return this.BaseURL+"/productdetails/"+productId;
  }

  static ProductBySearch(key){
    return this.BaseURL+"/search/"+key;
  }

  static SimilarProduct(subcategoryId){
    return this.BaseURL+"/similar/"+subcategoryId;
  }

  static ProductReview(productCode){
    return this.BaseURL+"/product-review/"+productCode;
  }

  static CartCount(productCode){
    return this.BaseURL+"/cartcount/"+productCode;
  }

  static FavItemCount(email){
    return this.BaseURL+"/favouriteitemcount/"+email;
  }
  
  static AddFavourite(productCode, email){
    return this.BaseURL+"/favourite/"+productCode+"/"+email;
  }

  static GetFavouriteList(email){
    return this.BaseURL+"/favouritelist/"+email;
  }

  static CartList(email){
    return this.BaseURL+"/carlist/"+email;
  }

  static RemoveCartItem(id){
    return this.BaseURL+"/removecartitem/"+id;
  }

  static CartItemPlus(id, quantity, price){
    return this.BaseURL+"/cartitemaplus/"+id+"/"+quantity+"/"+price;
  }

  static CartItemMinus(id, quantity, price){
    return this.BaseURL+"/cartitemaminus/"+id+"/"+quantity+"/"+price;
  }

  static RemoveFavouriteItem(product_code,email){
    return this.BaseURL+"/removefavourite/"+product_code+"/"+email;
  }

  static UserOrderList(email){
    return this.BaseURL+"/orderlist/"+email;
  }

  static UserLogin = this.BaseURL+"/login";
  static UserData = this.BaseURL+"/user";
  static UserRegister = this.BaseURL+"/register";
  static UserForgetPassword = this.BaseURL+"/forgetpassword";
  static UserResetPassword = this.BaseURL+"/resetpassword";
  static AddToCart = this.BaseURL+"/addtocart";
  static CartOrder = this.BaseURL+"/order";
  static PostReview = this.BaseURL+"/postreview"

}

export default APPURL
