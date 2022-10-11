import { BuiltinTypeName } from "@angular/compiler"

export default class NavigatorHerlper{

    static getLocation(): Promise<any>{
        let opcion: any = {
          timeout: 7,
        }

        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // console.log("Position");
                    // console.log(position);
                    resolve(position)
                },
                (error) => {
                    // console.log("Error");
                    // console.log(error);
                    reject(error)
                }
            )
        })
    }

    static getLocationC(success:(x:any) => void, error: (x:any) => void){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                success(position)
            },
            (err) => {
                error(err)
            }
        )
    }

    static startRecord(video: HTMLVideoElement, btn: HTMLElement){
        navigator.mediaDevices.getUserMedia({
            video: {
                width: 800,
                height: 600,
                deviceId: {
                    exact: "2c68ff6d985731f5c0922130a4627b965c209429c5fdb816e9cbfeb2c74f7c90",
                }
            },
            audio: true
        })
        .then((mediaStream) => {
            video.srcObject = mediaStream
            video.onloadedmetadata = resp => {
                video.play()
                let data: any = []
                const record = new MediaRecorder(mediaStream, {
                    mimeType: "video/webm",
                })
                record.ondataavailable = event => {
                    console.log("OnDataAvailable");
                    data.push(event.data)
                }
                record.onstop = () => {
                    console.log("OnStop");
                    const blob = new Blob(data, {
                        type: 'video/webm'
                    })
                    // const reader = new FileReader()
                    // reader.readAsDataURL(blob)
                    // reader.onloadend = () => {
                    //     console.log(reader.result);
                    // }
                    // console.log(URL.createObjectURL(blob));
                    const url = URL.createObjectURL(blob)
                    let element = document.createElement("a")
                    element.href = url
                    element.download = "video.webm"
                    element.click()
                    document.body.appendChild(element)
                }
                setTimeout(() => {
                    console.log("toStart");
                    record.start()
                }, 100)

                btn.addEventListener( 'click', () => {
                    console.log("toStop");
                    record.stop()
                })
            }
        })
        .catch((error) => {

        })
    }

    static getDevices(){
        navigator.mediaDevices.enumerateDevices()
        .then((response) => {
            response.forEach((item) => {
                if(item.kind === "videoinput"){
                    console.log(item);
                }
            })
        })
    }

    static startRecordAudio(audio: HTMLAudioElement, btn: HTMLElement){
        navigator.mediaDevices.getUserMedia({
            audio: true
        })
        .then((mediaStream) => {
            audio.srcObject = mediaStream
            audio.onloadedmetadata = resp => {
                audio.play()
                let data: any = []
                const record = new MediaRecorder(mediaStream, {
                    mimeType: "audio/webm",
                })
                record.ondataavailable = event => {
                    console.log("OnDataAvailable");
                    data.push(event.data)
                }
                record.onstop = () => {
                    console.log("OnStop");
                    const blob = new Blob(data, {
                        type: "audio/webm"
                    })
                    // const reader = new FileReader()
                    // reader.readAsDataURL(blob)
                    // reader.onloadend = () => {
                    //     console.log(reader.result);
                    // }
                    // console.log(URL.createObjectURL(blob));
                    const url = URL.createObjectURL(blob)
                    let element = document.createElement("a")
                    element.href = url
                    element.download = "audio.webm"
                    element.click()
                    document.body.appendChild(element)
                }
                setTimeout(() => {
                    console.log("toStart");
                    record.start()
                }, 100)

                btn.addEventListener( 'click', () => {
                    console.log("toStop");
                    record.stop()
                })
            }
        })
        .catch((error) => {

        })
    }

}