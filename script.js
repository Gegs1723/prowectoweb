document.addEventListener('DOMContentLoaded', function() {
  // Obtener el carrito guardado del almacenamiento local o inicializarlo como un array vacío
  var carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Función para agregar un producto al carrito
  function agregarAlCarrito(producto) {
    carrito.push(producto);
    console.log("Producto agregado al carrito:", producto);
    // Guardar el carrito actualizado en el almacenamiento local
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
  }

  // Función para eliminar un producto del carrito por su índice
  function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    // Guardar el carrito actualizado en el almacenamiento local
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
  }

  // Función para actualizar el contenido del carrito en la página
  function actualizarCarrito() {
    var cartItemsContainer = document.getElementById('cart-items-container');
    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = ''; // Limpiar el contenido del contenedor

      // Recorrer el array de productos en el carrito y agregarlos al contenedor
      carrito.forEach(function(producto, index) {
        var cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.codigo}">
          <p>${producto.codigo}</p>
          <p class="product-price">$${producto.precio.toFixed(2)}</p>
          <button class="remove-btn">Eliminar</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        // Agregar event listener al botón de eliminar
        var removeButton = cartItem.querySelector('.remove-btn');
        removeButton.addEventListener('click', function() {
          eliminarDelCarrito(index);
        });
      });
    }

    // Calcular el total de productos
    var totalProductos = 0;
    carrito.forEach(function(producto) {
      totalProductos += producto.precio;
    });
    // Mostrar el total de productos en la sección de resumen del pedido
    var totalProductosElement = document.getElementById('total-productos');
    if (totalProductosElement) {
      totalProductosElement.innerText = '$' + totalProductos.toFixed(2); // Mostrar el total con dos decimales
    }

    // Calcular el total
    var total = totalProductos;
    // Mostrar el total en la sección de resumen del pedido
    var totalElement = document.getElementById('total-a-pagar');
    if (totalElement) {
      totalElement.innerText = '$' + total.toFixed(2); // Mostrar el total con dos decimales
    }
  }

  // Event listener para el botón "Agregar al Carrito"
  var addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(function(button) {
    button.addEventListener('click', function(event) {
      var producto = {
        codigo: event.target.parentElement.parentElement.querySelector('h3').innerText,
        imagen: event.target.parentElement.parentElement.querySelector('img').src,
        precio: parseFloat(event.target.parentElement.parentElement.querySelector('h4').innerText.slice(1)) // Convertir el precio a un número flotante
      };
      agregarAlCarrito(producto);
    });
  });

  // Al cargar la página del carrito, actualizar el contenido del carrito
  actualizarCarrito();
});
























// Función para registrar un usuario
function registerUser() {
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    if (!name || !email || !password || !confirmPassword) {
        alert('Por favor, completa todos los campos.');
        return false;
    }

    if (!email.includes('@')) {
        alert('El correo debe contener un "@".');
        return false;
    }

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return false;
    }

    // Guardar usuario en el almacenamiento local
    var user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem(email, JSON.stringify(user));

    alert('¡Registro exitoso! Por favor, inicia sesión.');
    window.location.href = 'login.html';
    return false; // Evitar que el formulario se envíe automáticamente
}

// Función para iniciar sesión
function login() {
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Por favor, ingresa tu correo y contraseña.');
        return false;
    }

    var user = JSON.parse(localStorage.getItem(email));

    if (user && user.password === password) {
        alert('Inicio de sesión exitoso. Redireccionando...');
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'inicio.html'; // Cambia 'inicio.html' al nombre de tu página de inicio
        return false; // Evitar que el formulario se envíe automáticamente
    } else {
        alert('Credenciales incorrectas. Por favor, intenta nuevamente.');
        return false; // Evitar que el formulario se envíe automáticamente
    }
}

// Obtener el nombre de usuario desde el almacenamiento local
var currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser) {
    var userName = currentUser.name;
    // Insertar el nombre de usuario en el nav
    var userInfoElement = document.getElementById('user-info');
    userInfoElement.innerHTML = '<p>Bienvenido, ' + userName + '</p>';
}




























