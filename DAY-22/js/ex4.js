const containerElement = document.querySelector(".container");

var data = [
    {
        img: "./assets/img/cat-1.jpg",
        title: "Tiêu đề bài viết 1",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi doloremque similique, tempore ipsam id iste voluptate sint illum autem aut tenetur minima impedit vero non accusamus sequi ad recusandae at quibusdam! Ducimus suscipit inventore commodi cum laudantium, mollitia deleniti, quas est laboriosam architecto ullam debitis quae? Hic vel autem, aperiam eaque dolore modi sed consequatur, laborum consectetur ipsam consequuntur magni, facere placeat similique dolor culpa at!",
    },
    {
        img: "./assets/img/cat-1.jpg",
        title: "Tiêu đề bài viết 2",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi doloremque similique, tempore ipsam id iste voluptate sint illum autem aut tenetur minima impedit vero non accusamus sequi ad recusandae at quibusdam! Ducimus suscipit inventore commodi cum laudantium, mollitia deleniti, quas est laboriosam architecto ullam debitis quae? Hic vel autem, aperiam eaque dolore modi sed consequatur, laborum consectetur ipsam consequuntur magni, facere placeat similique dolor culpa at!",
    },
    {
        img: "./assets/img/cat-1.jpg",
        title: "Tiêu đề bài viết 3",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi doloremque similique, tempore ipsam id iste voluptate sint illum autem aut tenetur minima impedit vero non accusamus sequi ad recusandae at quibusdam! Ducimus suscipit inventore commodi cum laudantium, mollitia deleniti, quas est laboriosam architecto ullam debitis quae? Hic vel autem, aperiam eaque dolore modi sed consequatur, laborum consectetur ipsam consequuntur magni, facere placeat similique dolor culpa at!",
    },
];

for (var index in data) {
    var box = `
    <div class="item">
        <img class="image" src="${data[index].img}">
        <div class="content">
            <h2 class="title">${data[index].title}</h2>
            <p class="desc">${data[index].desc}</p>
        </div>
    </div>
    `;
    containerElement.innerHTML += box;
}
