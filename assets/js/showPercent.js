export function showPercent(){
    var htmlWait = `<div class="wait hidden">
    <h5>Por favor aguarde, extraindo texto...</h5>
    <i class="fas fa-circle-notch fa-spin"></i>
    <p class="percent"></p>  
    </div>`
    $('.output-text').html(htmlWait)
    $('.wait').removeClass('hidden');
    $('.show').addClass('show');
    return true;
}
