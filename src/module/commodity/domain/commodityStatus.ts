export default abstract class CommodityStatus {
    static readonly draft = "draft";
    static readonly giving = "giving";
    static readonly giveExpired = "giveExpired";
    static readonly pending = "pending";
    static readonly receiving = "receiving";
    static readonly expired = "expired";
    static readonly finished = "finished";

    static get values() {
        return [
            this.draft,
            this.giving,
            this.giveExpired,
            this.pending,
            this.receiving,
            this.expired,
            this.finished,
        ];
    }
}
