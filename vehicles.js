
Clock
by William Muzyka 
  

OpenProcessing
Get Started
Join OpenProcessing

Sign In

Be a Plus+ Member

Sketches
Start coding in seconds, experiment, and create.

Explore Sketches

Create a Sketch

Classes
Teach coding, collaborate, and showcase class work.

Explore Classes

Create a Class

Search
/ Recent s / Browse Allphysics game visualization particles color evolution circle lines
Email Contact Us Frequently Asked Questions FAQ Follow OpenProcessing on Twitter TwitterCredits Community Guidelines Terms of Service Privacy Policy

        var tg = createVector(mx, my);
        var desired = p5.Vector.sub(tg, this.pos);
        if (desired.mag() < 50) {
            desired.setMag(this.maxSpeed);
            desired.mult(-1);
            var steer = p5.Vector.sub(desired, this.vel);
            steer.limit(this.maxForce);
            return steer;
        } else {
            return createVector(0, 0);
        }
    }
​
    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }
​
    clone() {
        var v = new Vehicle(this.pos.x, this.pos.y);
​
        v.pos.x = this.pos.x;
        v.pos.y = this.pos.y;
​
        v.vel.x = this.vel.x;
        v.vel.y = this.vel.y;
​
        v.acc.x = this.acc.x;
        v.acc.y = this.acc.y;
​
        return v;
    }
}
Sketch
Files
Editor
Engine
Tutorial Mode (Beta) 🎉Write step-by-step tutorials. Learn more
HTML/CSS (Beta)Code HTML and CSS Manually
Showcase SketchCenters your sketch and paints the page background.
Infinite Loop Protection
LibrariesShow All
p5.dom 

(p5.dom is now part of p5js, no need to enable if using v0.10+).
p5.dom library lets you use video, audio, webcam, input, and text.
Examples: Dom - Video
p5.sound
Join Plus+ to remove ads, add custom libraries and more!

