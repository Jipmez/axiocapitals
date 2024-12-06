import { Component, OnInit, ElementRef, ViewChild, AfterViewInit  } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
declare var $;
@Component({
  selector: "app-onboard",
  templateUrl: "./onboard.component.html",
  styleUrls: ["./onboard.component.scss"],
})
export class OnboardComponent implements OnInit {

  @ViewChild('audioRef') audioRef!: ElementRef<HTMLAudioElement>;
  user: any;

  constructor(private activate: ActivatedRoute) {}

  ngOnInit(): void {
    let data = this.activate.snapshot.data;
    this.user = data["news"].dep["message"][0]["username"];
    console.log(this.user)
    // $(".win").trigger("play");
  }



  ngAfterViewInit() {
    // The audio element is now available
    // this.ensureVideoPlays()
    // this.playAudio()
  }



  playAudio() {
    this.audioRef.nativeElement.play().catch(error => {
      console.error('Error trying to play audio:', error);
    });
  }


  private ensureVideoPlays(): void{
    const video = document.querySelector("audio");
    console.log(video)

    if(!video) return;

    const promise = video.play();
    if(promise !== undefined){
        promise.then(() => {
            // Autoplay started
        }).catch(error => {
            // Autoplay was prevented.
            video.muted = true;
            video.play();
        });
    }
}
}
