
function addProduct() {
        event.preventDefault();
        
        var name = getValueById("product_name");
        var price = getValueById("product_price");
        var desc = getValueById("product_description");
        var imgUrl = getValueById("imageURL");
        var product = {
            prodId: generateUniqueId(),
            name: name,
            price: price,
            description: desc,
            imageUrl: imgUrl
        }
        console.log(product);
        var products = JSON.parse(localStorage.getItem("products"));
        products.push(product);
        localStorage.setItem("products",JSON.stringify(products));
        document.getElementById("form").reset();
        showProducts();
        document.getElementById("display").innerHTML="Product List";
    }
    function getValueById(id) {
        var value = document.getElementById(id).value;
        return value;
    }
    function showProducts() {
        var index = 0;
        var productsList = "";
        var products = JSON.parse(localStorage.getItem("products"));
        while (index < products.length) {
            console.log("i am inside show while");
            var product = products[index];
            productsList = productsList + "<li>" + "<img id='displayAddImgId' style='width:42px; height:42px' src=" + product.imageUrl + ">" + product.name + "&nbsp;&nbsp;&nbsp;" + product.price + "&nbsp;&nbsp;&nbsp;" +product.description+ "&nbsp;&nbsp;&nbsp;" + "<button onclick='deleteProduct(" + product.prodId + ")'>Delete</button> " + "<button onclick='updateProduct(" + product.prodId + ")'>update</button>" + " </li > ";
            index++;
        }
        document.getElementById("productList").innerHTML = productsList;
    }
    function showProductsIndex() {
        var index = 0;
        var productsList = "";
        var products = JSON.parse(localStorage.getItem("products"));
        while (index < products.length) {
            console.log("i am inside show while");
            var product = products[index];
            
            productsList = productsList + "<li>" + "<img id='displayImgId' src=" + product.imageUrl + "> <br>" + product.name + "&nbsp;&nbsp;&nbsp;" + product.price + "<i class='fa-light fa-indian-rupee-sign' id='rupeeIcon'></i>"+"&nbsp;&nbsp;&nbsp;" +product.description+ "&nbsp;&nbsp;&nbsp;" + " </li > ";
            index++;
        }
        products.length==0?document.getElementById("indexHeading").innerHTML="":document.getElementById("indexHeading").innerHTML="Product List";
        
        document.getElementById("productListIndex").innerHTML = productsList;
    }

    
    function generateUniqueId() {
        if(localStorage.getItem("initialId")==null){
            localStorage.setItem("initialId",0);
        }
        
        var initialId = parseInt(localStorage.getItem("initialId"));
        initialId++;
        localStorage.setItem("initialId",initialId);
        return initialId;
        
    }
    function updateValue(id, inputValue) {
            document.getElementById(id).value = inputValue;
        }
    function deleteProduct(pid) {
        console.log(pid);
        var index = 0;
        var products = JSON.parse(localStorage.getItem("products"));
        while (index < products.length) {
        var product = products[index];
        if (product.prodId == pid) {
            products.splice(index, 1);
            break;
            }
        index++;
        }
        localStorage.setItem("products",JSON.stringify(products));
        showProducts();
        if(products.length==0){
        document.getElementById("display").innerHTML="";
        localStorage.setItem("initialId",0);
        }
    }
    function updateProduct(pid) {
        console.log("i am in update product");
        var index = 0;
        var products = JSON.parse(localStorage.getItem("products"));
        while (index < products.length) {
            console.log("i am in update product while");
            var product = products[index];
            if (product.prodId == pid) {
                console.log("i am in update product if elase");
                updateValue("product_name", product.name);
                updateValue("product_price", product.price);
                updateValue("product_description", product.description);
                updateValue("imageURL", product.imageUrl);
                }
            index++;
        }
        document.getElementById("addOrSave").innerHTML = "Save Product";
        document.getElementById("addOrSave").removeAttribute("onclick");
        document.getElementById("addOrSave").setAttribute('onclick', "saveProduct(" + pid + ")");
}
    function saveProduct(pid) {
        console.log("I am in saveProduct", pid);
        event.preventDefault();
        var name = getValueById("product_name");
        var price = getValueById("product_price");
        var desc = getValueById("product_description");
        var imgUrl = getValueById("product_img_url");
        var index = 0;
        var products = JSON.parse(localStorage.getItem("products"));
        while (index < products.length) {
            var product = products[index];
            if (product.prodId == pid) {
                product.name = name;
                product.price = price;
                product.description = desc;
                product.imageUrl = imgUrl;
                break;
                }
            index++;
        }
        localStorage.setItem("products",JSON.stringify(product));
        var addOrSave = document.getElementById("addOrSave");
        addOrSave.innerHTML = "Add Product";
        addOrSave.removeAttribute("onclick");
        addOrSave.setAttribute('onclick', "addProduct()");
        document.getElementById("form").reset();
        showProducts();
}