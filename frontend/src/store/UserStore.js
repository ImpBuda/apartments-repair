import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this.searchValue = ""
        this.category = ""
        makeAutoObservable(this)
    }

    setCategory(value){
        this.category = value
    }

    get Category() {
        return this.category
    }

    setSearchValue(value){
        this.searchValue = value
    }

    get SearchValue() {
        return this.searchValue
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    get isAuth() {
        return this._isAuth
    }

}