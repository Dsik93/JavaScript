document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const startButton = document.getElementById('startButton');
    const resetButton = document.getElementById('resetButton');
    const numBallsInput = document.getElementById('numBalls');
    const distanceInput = document.getElementById('distance');
  
    let balls = [];
    let animationFrameId;
    let numBalls = parseInt(numBallsInput.value, 10);
    let distance = parseInt(distanceInput.value, 10);
    let width = window.innerWidth * 0.8;
    let height = window.innerHeight * 0.8;
    canvas.width = width;
    canvas.height = height;
  
    // Funkcja tworząca nową kulkę z losową pozycją i prędkością
    function createBall() {
      const radius = 10;
      const x = Math.random() * (width - 2 * radius) + radius;
      const y = Math.random() * (height - 2 * radius) + radius;
      const dx = (Math.random() - 0.5) * 2;
      const dy = (Math.random() - 0.5) * 2;
      return { x, y, dx, dy, radius };
    }
  
    // Funkcja inicjująca kulki
    function initBalls() {
      balls = [];
      for (let i = 0; i < numBalls; i++) {
        balls.push(createBall());
      }
    }
  
    // Funkcja rysująca kulkę
    function drawBall(ball) {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.closePath();
    }
  
    // Funkcja rysująca linię między dwiema kulkami
    function drawLine(ball1, ball2) {
      ctx.beginPath();
      ctx.moveTo(ball1.x, ball1.y);
      ctx.lineTo(ball2.x, ball2.y);
      ctx.strokeStyle = 'gray';
      ctx.stroke();
      ctx.closePath();
    }
  
    // Funkcja aktualizująca pozycję kulki
    function updateBall(ball) {
      ball.x += ball.dx;
      ball.y += ball.dy;
  
      // Odbicie od krawędzi poziomych
      if (ball.x + ball.radius > width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
      }
  
      // Odbicie od krawędzi pionowych
      if (ball.y + ball.radius > height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
      }
    }
  
    // Funkcja animująca kulki
    function animate() {
      ctx.clearRect(0, 0, width, height);
  
      // Rysowanie linii między kulkami, jeśli są wystarczająco blisko
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const dist = Math.hypot(balls[i].x - balls[j].x, balls[i].y - balls[j].y);
          if (dist < distance) {
            drawLine(balls[i], balls[j]);
          }
        }
      }
  
      // Aktualizacja pozycji i rysowanie kulek
      balls.forEach(ball => {
        updateBall(ball);
        drawBall(ball);
      });
  
      animationFrameId = requestAnimationFrame(animate);
    }
  
    // Funkcja uruchamiająca animację
    function startAnimation() {
      cancelAnimationFrame(animationFrameId);
      numBalls = parseInt(numBallsInput.value, 10);
      distance = parseInt(distanceInput.value, 10);
      initBalls();
      animate();
    }
  
    // Funkcja resetująca animację
    function resetAnimation() {
      cancelAnimationFrame(animationFrameId);
      ctx.clearRect(0, 0, width, height);
      balls = [];
    }
  
    // Dodanie nasłuchiwaczy zdarzeń do przycisków
    startButton.addEventListener('click', startAnimation);
    resetButton.addEventListener('click', resetAnimation);
  
    // Dostosowanie rozmiaru kanwy przy zmianie rozmiaru okna
    window.addEventListener('resize', () => {
      width = window.innerWidth * 0.8;
      height = window.innerHeight * 0.8;
      canvas.width = width;
      canvas.height = height;
      resetAnimation();
    });
  
    // Inicjalizacja kulek i uruchomienie animacji
    initBalls();
  });
  