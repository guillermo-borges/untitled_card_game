import fs from "fs"
import path from "path"
import _ from "lodash"

const dirname = (f) => f.match(/(.*)[/\\]/)[1] || ""
const cache = {}

export const listAssets = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach(file => {
        filelist = fs.statSync(path.join(dir, file)).isDirectory() ?
            listAssets(path.join(dir, file), filelist) :
            filelist.concat(path.join(dir, file))
    })
    return filelist
}

export const loadAssets = (dir = "./assets/playsets") => {
    const files = listAssets(dir)
    let results = []
    const jsFiles = files.filter(x => x.endsWith(".json"))
    const assetGroups = jsFiles.map(f => {
        const json = JSON.parse(fs.readFileSync(f))
        if (_.isArray(json)) {
            json.map(x => {
                x.file = f
                x.location = dirname(f)
            })
            return json
        } else {
            json.file = f
            json.location = dirname(f)
            return [json]
        }
    })
    assetGroups.forEach(ag => {
        results = results.concat(ag)
    })

    return results
}

export const loadImage = (p, dir = "./assets") => {
    if (cache[p] != null) return cache[p]
    const img = fs.readFileSync(path.join(dir, p)).toString("base64")
    cache[p] = `data:image/png;base64,${img}`
    return cache[p]
}

export const getRef = (path) => `file://assets/${path}`
