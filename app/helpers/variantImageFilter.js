export function queryParamExists(queries, queryParam) {
  if (!queries && !queryParam) return false;

  return queries.includes(queryParam);
}

export function getColorQueryParam(queries, queryParam) {
  if (!queries && !queryParam) return null;

  if (queries.includes('&')) {
    const _queries = queries.split('&');
    for (let i = 0; i < _queries.length; i++) {
      if (_queries[i].includes(queryParam)) {
        // console.log(queries[i]);
        return _queries[i].split('=').slice(1).join('=');
      }
    }
    return null;
  } else {
    return queries.split('=').slice(1).join('=') || null;
  }
}

export function filenameMatchingColorName(filename, color) {
  const split = filename.split('--');

  const extratedColor = split.pop();
  let newStr = extratedColor.replace(/-/g, '+');
  if (newStr.toLowerCase() === color.toLowerCase()) return true;
  return false;
}

export function getFilteredImagesByAltText(images, queryParam) {
  if ((!images || images.length === 0) && !queryParam) return [];

  const _queryParam = queryParam.includes('+')
    ? queryParam.replace(/\+/g, ' ')
    : queryParam;

  return (
    images.filter((img) => {
      // console.log('img: ', img);
      return img.altText
        ? img.altText?.toLowerCase()?.includes(_queryParam?.toLowerCase())
        : null;
    }) || []
  );
}
