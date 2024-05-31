# Fitness Tracker Project

A comprehensive fitness tracker built with Python Flask, incorporating JWT authentication for different users. This project includes features for tracking stress, water intake, food consumption, sleep, and exercise, along with personalized health recommendations using machine learning. Almost all data is stored using SQLite in a single schema format based on user ID.

## Table of Contents

- [Features and Usage](#features-and-usage)
- [Branches](#branches)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features and Usage

This fitness tracker includes the following features:

1. **Stress Quiz**: Assess your stress levels with a simple quiz. The results are stored and can be tracked over time to help you understand and manage your stress better.
2. **Water Tracker**: Monitor your daily water intake and visualize your progress. The tracker helps you stay hydrated by logging your water consumption and displaying your progress through interactive charts.
3. **Food Tracker**: Compare your food consumption with ideal intake through pie charts and local storage for health scores. This feature also includes machine learning to recommend daily fruit and vegetable intake based on your lifestyle stats. Track your meals and get insights into your eating habits to improve your diet.
4. **Sleep Tracker**: Track your sleep patterns with bar graphs. Record your daily sleep duration and quality, and view your sleep trends over time to ensure you are getting enough rest.
5. **Profile Creation**: Create a profile with ASCII picture selection. Customize your profile with unique ASCII art avatars and store personal health data securely.
6. **Exercise Tracker**: Monitor your exercise routines with bar graphs. Log your workouts, view your exercise history, and analyze your performance to stay motivated and reach your fitness goals.

### Frontend and Backend Access
- The frontend of the application is accessible via [GitHub Pages](https://jplip.github.io/frontTri2/).
- The backend is currently available locally. You can set it up by following these steps:
~~~
# Clone the repository
git clone https://github.com/jplip/fitness-back.git

# Navigate to the project directory
cd fitness-back
# Install dependencies
pip install -r requirements.txt
~~~
## Branches

- Use the `testing` branch for basic updates.
- Use the `token` branch if you are trying to update the token feature.
- Use the `binary` branch if you want to access the binary project.
- Use the `history` branch to update the latest working history.

## Contributing

Explain how others can contribute to your project.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

Special thanks to:

- [Nighthawk Coders](https://github.com/nighthawkcoders/flask_portfolio) by Mr. Mortensen for their Flask Portfolio project, which provided inspiration and guidance for this project.
- [hawkcoders/Nighthawk-Pages](https://github.com/hawkcoders/Nighthawk-Pages): A customizable template for people to use, Nighthawk Pages, but better looking and hopefully more functional (eventually). Based and inspired by the now deprecated Fastpages. Created by Tirth Thakkar & Haseeb Beg.

