const app = new App('#app');

const mockApi = new MockAPI();

const dogTemplate = (dog) => `
    <section class="dog-listing">
        <a href="#/dogs/${dog.id}">
            <h3 class="name">${dog.name}</h3>
            <section>
                <p>${dog.description}</p>
            </section>
        </a>
    </section>
`;

const dogs = [
    {
        id : 1,
        name : "Sparky",
        description: "Sparky desc"
    },
    {
        id : 2,
        name : "Doggy",
        description: "Doggy desc"
    }
];

app.addComponent({
    name: 'dogs',
    model: {
        dogs: []
    },
    view(model) {
        const dogsHTML = model.dogs.reduce((html, dog) => html + `<li>${dogTemplate(dog)}</li>`, '')
        return `
            <ul class="dogs">
                ${dogsHTML}
            </ul>
        `;
    },
    controller(model) {
        mockApi
            .getMockData(
                [
                    {
                        id : 1,
                        name : "Sparky",
                        description: "Sparky desc"
                    },
                    {
                        id : 2,
                        name : "Doggy",
                        description: "Doggy desc"
                    }
                ],
                100
            )
            .then(res => {
                model.dogs = res;
            });
    }
});

app.addComponent({
    name: 'dog',
    model: {
      dog: {}
    },
    view(model) {
      return dogTemplate(model.dog);
    },
    controller(model) {
        mockApi
            .getMockData(dogs.find(dog => dog.id == router.params[1]), 100)
            .then(res => {
                model.dog = res;
            });
    }
  });

const router = new Router(app);

router.addRoute('dogs', '^#/dogs$');
router.addRoute('dog', '^#/dogs/([0-9]*)$');
