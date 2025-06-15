$(function(){
  $(".twentytwenty-container").twentytwenty({
    default_offset_pct: 0.5, // Slider in the middle
    orientation: 'horizontal',
    before_label: 'Before', // (optional)
    after_label: 'After',   // (optional)
    no_overlay: false,
    move_slider_on_hover: false,
    move_with_handle_only: true,
    click_to_move: false
  });
});
