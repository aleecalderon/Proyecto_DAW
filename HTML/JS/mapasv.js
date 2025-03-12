document.addEventListener("DOMContentLoaded", () => {
    const tooltip = document.getElementById("tooltip");
    const tooltipText = document.getElementById("tooltip-text");
    const tooltipImg = document.getElementById("tooltip-img");
    
    document.querySelectorAll("path").forEach(departamento => {
        departamento.addEventListener("mouseover", function (event) {
            tooltipText.textContent = this.dataset.info;
            tooltipImg.src = this.dataset.imagen;
            tooltip.style.display = "block";
            tooltip.style.left = event.pageX + "px";
            tooltip.style.top = event.pageY + "px";
        });
        
        departamento.addEventListener("mousemove", function (event) {
            tooltip.style.left = event.pageX + "px";
            tooltip.style.top = event.pageY + "px";
        });
        
        departamento.addEventListener("mouseleave", function () {
            tooltip.style.display = "none";
        });
    });
});
