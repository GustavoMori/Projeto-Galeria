import $ from 'jquery'
const loadHtmlSuccessCallBack = []

export function onLoadHtmlSuccess(callback){
    if(!loadHtmlSuccessCallBack.includes(callback)){
        loadHtmlSuccessCallBack.push(callback)
    }
}
function loadIncludes(parent){
    if(!parent) parent = 'body'
    $(parent).find('[hd-include]').each(function(index, element){
        const url = $(element).attr('hd-include')
        $.ajax({
            url,
            success(data){
                $(element).html(data)
                $(element).removeAttr('hd-include')
                loadHtmlSuccessCallBack.forEach(callback => callback(data))
                loadIncludes(element)

            }
        })
    })
}

loadIncludes()