// Controls home page view
function getIndex(req,res){
    res.render('dashboard', {
        loginStatus: res.locals.dashVal,
        name: res.locals.name
    })
}


module.exports = {getIndex};