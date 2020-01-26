new Vue({
    el: '#app',
    data: {
        greeting: '',
        user: 'Hassan Oliver',
        city: 'Toronto'
    },
    methods: {
        addGreeting(){
            this.greeting = 'Hello World!';
        }
    }
});