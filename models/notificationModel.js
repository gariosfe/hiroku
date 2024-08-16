class notification {
    constructor(id, message, shipping_date, state) {
        (this.id = id),
        (this.message = message),
        (this.shipping_date = shipping_date),
        (this.state = state);
    }
}

export default notification;
