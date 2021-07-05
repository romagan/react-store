export default class GoodsStoreService {
  _apiBase = `https://fakestoreapi.com/`;

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) throw new Error(`Couldn't fetch ${url}`);

    return await res.json();
  }

  getProducts = async() => {
    const res = await this.getResource(`products`);
    return res;
  }

  getProduct = async(id) => {
    const res = await this.getResource(`products/${id}`);
    return res;
  }
}
