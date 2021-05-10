function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('../Media/', '')] = r(item); });
    return images;
  }
  const imgs = importAll(require.context('../Media/', false, '/\.jpg/'));