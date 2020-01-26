new Vue({
    el: '#app',
    data: {
        greeting: 'Hello World!',
        user: 'Joshua bloc',
        city: 'newyork',
    },
    methods: {
        changeGreeting() {
            this.greeting = this.greeting === 'Hello World!' ?
            'What is up!' : 
            'Hello World!';
        }
    }
});