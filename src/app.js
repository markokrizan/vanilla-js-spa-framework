class App {
    constructor(selector) {
        this.appElement = document.querySelector(selector);
        this.componentsByName = {};
    }

    addComponent(component) {
        this.componentsByName[component.name] = component;

        component.model = this.proxify(component.model);
    }

    showComponent(name) {
        this.currentComponent = this.componentsByName[name];

        if(this.currentComponent) {
            this.invokeController();
            this.updateView();
        }
    }

    updateView() {
        this.appElement.innerHTML = this.currentComponent.view(this.currentComponent.model)
    }

    invokeController() {
        this.currentComponent.controller(this.currentComponent.model)
    }

    /**
     * Return a proxy object from the component model in order to intercept the setting of model object properties
     * 
     * This way data binding is achieved
     * 
     * @param {*} model 
     */
    proxify(model) {
        const self = this;

        return new Proxy(model, {
            set(target, property, value) {
                target[property] = value;
                self.updateView()
                return true;
            }
        });
    }
}
