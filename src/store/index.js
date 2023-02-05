import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*
  State cuva podatke i komponente ga citaju i menjaju
    Definisemo sta nam je potrebno od promenljivih.

  Mutations akcije koje menjaju state, komponente pozivaju
  akcije koje urade neku logiku a nakon toga se nakon mutacije
  menja stanje.
    addItem() - mutatcija koja dodaje novi item u items promenljivu.
    Mutations funkcijama uvek dajemo parametar state kako bismo
    mogli da pristupimo promenljivama, state.items.
    Drugi parametar je podatak sa kojim radimo. {item, departments, ..} objekat koji ima n parametara.

  Actions sve sto komunicira sa api-jem, fetch podataka itd itd. Eventi unutar komponenti
  ne rade fetch vec u zavisnosti od stanja odredjuju da li rade ili ne rade fetch
  vec fetchuju iz stanja.

  Commit method ce da pozove mutaciju sa odgovarajucim argumentima.
*/

export default new Vuex.Store({
  state: {
    cartProducts: [],
    categories: [],
    productIDS: [],
    products: [],
    token: ''
  },

  mutations: {
    addProduct(state, product){
      state.products.push(product);
    },

    setCategories(state, prodcats){
      state.categories = prodcats;
    },
    
    setProductIDs(state, ids){
      state.productIDS = ids;
    },

    addIdsToProductCategory(state, obj){
      const cat = state.categories.filter(cat => cat.id == obj.id);
      cat['productIDS'] = obj.productIDS;
    },

    setToken(state, token){
      state.token = token;
      localStorage.token = token;
    },

    removeToken(state){
      state.token = '';
      localStorage.token = '';
    },

    addProductToCart(state, product){
      state.cartProducts.push(product);
    },

    removeFromCart(state, obj){
      state.cartProducts.splice(state.cartProducts.indexOf(obj), 1);
    }
  },

  actions: {
    fetchCategories({commit}){
      fetch("http://localhost:1337/admin/productCategory")
      .then(obj => obj.json())
      .then(res => {
        let tempNiz = [];
        for(let i=0;i<res.length;i++){
          console.log("Debug fetch productcat ids store: " + res[i].id);
          tempNiz.push(res[i]);
        }
        
        commit('setCategories', tempNiz);
      });
    },

    async fetchIdsByCategory({commit, state}, catID){
      const cat = state.categories.filter(cat => cat.id == catID)[0];  

      if(cat && cat['productIDS']){
        commit('setProductIDs', cat['productIDS']);
      }else{
        let resp = await fetch(`http://localhost:1337/admin/product`).then(res => res.json());
        
        let temp = [];

        for(let i=0;i<resp.length;i++){
          if(resp[i].ProductCategoryId == catID){
            temp.push(resp[i].id);
          }
        }
        
        console.log(temp);

        commit('addIdsToProductCategory', {
          id: catID,
          productIDS: temp
        });

        commit('setProductIDs', temp);
      }
    },

    fetchProducts({commit, state}){
      fetch(`http://localhost:1337/admin/product`)
      .then(res => res.json())
      .then(obj => {
        let temp = [];

        for(let i=0;i<obj.length;i++){
          temp.push(obj[i].id);
        }
        
        console.log("Fetch products arr: " + temp);
  
        commit('setProductIDs', temp);
      });
    },

    getProduct({commit, state}, id){
      return new Promise((resolve, reject) => {
        const product = state.products.filter(prod => prod.id == id)[0];

        if(product){
          resolve(product);
        }else{
          fetch(`http://localhost:1337/admin/product/${id}`)
          .then(obj => obj.json())
          .then(res => {
            commit('addProduct', res);
            resolve(res);
          });
        }
      });
    },

    searchForProduct({commit}, sq){
      fetch(`http://localhost:1337/admin/product/findProduct/${sq}`)
      .then(obj => obj.json())
      .then(res => {
        let tempNiz = [];
        for(let i=0;i<res.length;i++){
         console.log("Debug fetch search " + res[i].id);
          this.tempNiz.push(res[i].id)
        }
        commit('setProductIDs', this.tempNiz);
        // this.productIDS = tempNiz;
        // console.log("Ispis niza " + this.productIDS);
        // this.categoryname += this.productIDS.length;
      });
    },

    register({commit}, obj){
      fetch('http://127.0.0.1:9000/register', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(obj)
      }).then(res => res.json())
      .then(tkn => {
        if(tkn.msg){
          alert(tkn.msg);
        }else{
          commit('setToken', tkn.token);
        }
      });
    },

    login({commit}, obj){
      fetch('http://127.0.0.1:9000/login', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(obj)
      }).then(res => res.json())
      .then(tkn => {
        if(tkn.msg){
          alert(tkn.msg);
        }else{
          commit('setToken', tkn.token);
        }
      });
    },

    addToCart({commit}, obj){
      commit('addProductToCart', obj);
    },

    removeFromCart({commit}, obj){
      commit('removeFromCart', obj);
    }
  },
})
