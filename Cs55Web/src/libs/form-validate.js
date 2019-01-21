export const validateNull = (msg) => {
    return [{
        validator: validateNumber(msg),
        trigger: 'change'
    }, {
        validator: validateNumber(msg),
        trigger: 'blur'
    }]
}

/*
 * 数字不能为空
 * @param {String} msg 错误信息，默认提示‘不能为空’
 */
export const validateNumber = (msg) => (rule, value, cb) => {
    if (value === null || value === '' || value === undefined) {
        cb(new Error(msg || '不能为空'))
    }
    cb()
}

/**
 * 重置页面中所有的表单验证
 * @param {Object} refs
 */
export const resetFieldsInPage = (refs) => {
    Object.values(refs).forEach(el => {
        if (!Array.isArray(el)) {
            el.resetFields()
        } else if (el[0].validate) {
            el[0].resetFields()
        }
    })
}

/**
 * 重置页面中所有的表单验证
 * @param {Object} refs
 */
export const validateInPage = (refs) => {
    let isValid = true
    Object.values(refs).forEach(el => {
        if (el !== undefined) {
            if (!Array.isArray(el) && el.validate) {
                el.validate(valid => {
                    if (!valid) {
                        isValid = false
                        return false
                    }
                })
            } else if (el.length > 0 && el[0].validate) {
                el[0].validate(valid => {
                    if (!valid) {
                        isValid = false
                        return false
                    }
                })
            }
        }
    })
    return isValid
}
