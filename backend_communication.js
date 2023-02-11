const getAnswer = async (question) => {
    let data = {
      ctx: { "question": question },
      name: "talk"
    }

    try {
      // NOTE: Change this URL to your Jaseci server URL.
      // NOTE: Change the token to your authenticated token
      let result = await fetch('http://localhost:8000/js/walker_run', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'token bf6c3138799af356cbec27da90de0f7476fd9e25059c83dc0dfdd339ff68dd5b'
        },
        body: JSON.stringify(data),
      })
      result = await result.json();

      const answer = result.report[0];

      document.querySelector('#answer').innerHTML = answer;
      speech.text = answer.replace(/https?.*?(?= |$)/g, "");
      var voices = window.speechSynthesis.getVoices();
      speech.voice = voices[7];
      speechSynthesis.getVoices().forEach(function (voice) {
        console.log(voice.name, voice.default ? voice.default : '');
      });

      // Start Speaking
      window.speechSynthesis.speak(speech);

    } catch (error) {
      console.log(error)
    }
  }