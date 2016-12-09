import postcss from 'postcss'
import postcssJs from 'postcss-js'

import mapKeys from 'lodash/mapKeys'
import flatMap from 'lodash/flatMap'
import toPairs from 'lodash/toPairs'
import flatten from 'lodash/flatten'
import omit from 'lodash/omit'
import defaults from 'lodash/defaults'

const mergeObjects = (objs) => {
  return defaults.apply(this, objs)
}
const appendClassPrefix = (js) => {
  return mapKeys(js, (v, k) => {
    return `.${k}`
  })
}

const getPseudo = (js) => {
  const r = toPairs(js).map( ([parentSelector, style]) => {
    return toPairs(style).map( ([maybePseudo, maybeStyles]) => {
      if(typeof maybeStyles !== "object" ){
        return false
      }
      return [parentSelector, maybePseudo]
    }).filter( (v) => v )
  })
  return flatten(r)
}

const flattenPseudo = (js) => {
  const pseudos = getPseudo(js)
  const maps = pseudos.map( ([parent, pseudo]) => {
    const value = js[parent][pseudo]
    return {
      [parent]: omit(js[parent], pseudo),
      [`${parent}${pseudo}`]: value
    }
  })
  const styles = toPairs(js).map( ([parentSelector, style]) => {
    if(!pseudos.every( ([parent, pseudo]) => (parent !== parentSelector) )){
      return {}
    }
    
    return { [parentSelector]: js[parentSelector] }
  })

  return mergeObjects([].concat(maps).concat(styles))
}

export default (input) => {
  let json = appendClassPrefix(input)
  json = flattenPseudo(json)
  console.log(json)
  return postcss()
    .process(json, {parser: postcssJs})
}