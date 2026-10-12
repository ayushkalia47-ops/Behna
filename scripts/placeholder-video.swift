// Renders the PLACEHOLDER hero film + poster for Behna Bikinis.
// This is abstract motion (light, colour and water) — NOT campaign footage.
// Replace public/assets/video/hero-*.mp4 and hero-poster-*.jpg with real footage.
//
// Usage: swift scripts/placeholder-video.swift <outDir> <width> <height> <name>

import AVFoundation
import CoreGraphics
import Foundation
import ImageIO
import UniformTypeIdentifiers

let args = CommandLine.arguments
let outDir = args.count > 1 ? args[1] : "public/assets/video"
let W = args.count > 2 ? Int(args[2])! : 1920
let H = args.count > 3 ? Int(args[3])! : 1080
let name = args.count > 4 ? args[4] : "hero-desktop"
let fps: Int32 = 24
let seconds = 12
let frames = Int(fps) * seconds

func rgb(_ hex: UInt32, _ a: CGFloat = 1) -> CGColor {
  CGColor(srgbRed: CGFloat((hex >> 16) & 0xff) / 255, green: CGFloat((hex >> 8) & 0xff) / 255,
          blue: CGFloat(hex & 0xff) / 255, alpha: a)
}

let emeraldDeep: UInt32 = 0x082E23
let emerald: UInt32 = 0x0E4D3A
let marigold: UInt32 = 0xE8901C
let saffron: UInt32 = 0xF2B04A
let sindoor: UInt32 = 0xC7271E
let ivory: UInt32 = 0xF7F1E5

let space = CGColorSpace(name: CGColorSpace.sRGB)!

func blob(_ ctx: CGContext, x: CGFloat, y: CGFloat, r: CGFloat, color: UInt32, alpha: CGFloat) {
  let g = CGGradient(colorsSpace: space, colors: [rgb(color, alpha), rgb(color, 0)] as CFArray, locations: [0, 1])!
  ctx.drawRadialGradient(g, startCenter: CGPoint(x: x, y: y), startRadius: 0,
                         endCenter: CGPoint(x: x, y: y), endRadius: r, options: [])
}

func drawFrame(_ ctx: CGContext, _ f: Int) {
  let w = CGFloat(W), h = CGFloat(H)
  let t = Double(f) / Double(frames) * 2 * Double.pi // one full period => seamless loop
  let s = min(w, h)
  let portrait = h > w
  ctx.saveGState()
  ctx.translateBy(x: 0, y: h)
  ctx.scaleBy(x: 1, y: -1) // y grows downward from here on

  // Wall + water ground
  let bg = CGGradient(colorsSpace: space, colors: [rgb(0x0A3528), rgb(emerald), rgb(0x06261C)] as CFArray, locations: [0, 0.6, 1])!
  ctx.drawLinearGradient(bg, start: CGPoint(x: 0, y: 0), end: CGPoint(x: 0, y: h), options: [])

  let horizon = h * (portrait ? 0.6 : 0.66)
  let aw = portrait ? w * 0.5 : s * 0.36
  let ah = portrait ? h * 0.36 : horizon * 0.72
  let acx = portrait ? w * 0.5 : w * 0.7
  let ax = acx - aw / 2, ay = horizon - ah
  let breathe = CGFloat(0.5 + 0.5 * sin(t))

  // Halo around the window
  blob(ctx, x: acx, y: ay + ah * 0.55, r: ah * 1.15, color: marigold, alpha: 0.18 + 0.08 * breathe)
  // Distant sindoor glow
  blob(ctx, x: w * (0.08 + 0.03 * CGFloat(sin(t + 1))), y: h * (portrait ? 0.18 : 0.2), r: s * 0.55, color: sindoor, alpha: 0.32)

  // Jharokha arch (cusped top), filled with sunset light
  let arch = CGMutablePath()
  arch.move(to: CGPoint(x: ax, y: horizon))
  arch.addLine(to: CGPoint(x: ax, y: ay + aw * 0.55))
  arch.addCurve(to: CGPoint(x: acx, y: ay), control1: CGPoint(x: ax, y: ay + aw * 0.18), control2: CGPoint(x: acx - aw * 0.22, y: ay + aw * 0.1))
  arch.addCurve(to: CGPoint(x: ax + aw, y: ay + aw * 0.55), control1: CGPoint(x: acx + aw * 0.22, y: ay + aw * 0.1), control2: CGPoint(x: ax + aw, y: ay + aw * 0.18))
  arch.addLine(to: CGPoint(x: ax + aw, y: horizon))
  arch.closeSubpath()
  ctx.saveGState()
  ctx.addPath(arch)
  ctx.clip()
  let sky = CGGradient(colorsSpace: space, colors: [rgb(0xF6C36A), rgb(saffron), rgb(marigold), rgb(0xD9541F), rgb(sindoor)] as CFArray, locations: [0, 0.3, 0.6, 0.85, 1])!
  ctx.drawLinearGradient(sky, start: CGPoint(x: 0, y: ay), end: CGPoint(x: 0, y: horizon), options: [])
  // the sun, slowly sinking and rising
  blob(ctx, x: acx + aw * 0.08, y: horizon - ah * (0.32 + 0.05 * CGFloat(cos(t))), r: aw * 0.34, color: 0xFFF1D0, alpha: 0.95)
  ctx.restoreGState()

  // Reflection: broken warm streaks on the water
  let rows = portrait ? 46 : 40
  for i in 0..<rows {
    let d = CGFloat(i) / CGFloat(rows)
    let y = horizon + (h - horizon) * d + 2
    let phase = Double(i) * 0.9
    let wob = CGFloat(sin(t * 2 + phase)) * aw * 0.08
    let width = aw * (0.95 - 0.5 * d) * CGFloat(0.75 + 0.25 * sin(t * 3 + phase * 1.7))
    let c = d < 0.35 ? saffron : (d < 0.7 ? marigold : sindoor)
    ctx.setStrokeColor(rgb(c, 0.55 * (1 - d) + 0.05))
    ctx.setLineWidth(max(1.5, s * 0.006 * (1 - d * 0.5)))
    ctx.setLineCap(.round)
    ctx.move(to: CGPoint(x: acx - width / 2 + wob, y: y))
    ctx.addLine(to: CGPoint(x: acx + width / 2 + wob, y: y))
    ctx.strokePath()
  }

  // Fine ripples across the water
  for i in 0..<18 {
    let d = CGFloat(i) / 18
    let y0 = horizon + (h - horizon) * d + 6
    let phase = Double(i) * 1.3
    let amp = (h - horizon) * 0.012
    let path = CGMutablePath()
    var x: CGFloat = -20
    var first = true
    while x <= w + 20 {
      let k = Double(x / w)
      let y = y0 + amp * CGFloat(sin(k * 11 + t * 2 + phase))
      if first { path.move(to: CGPoint(x: x, y: y)); first = false } else { path.addLine(to: CGPoint(x: x, y: y)) }
      x += 10
    }
    ctx.setStrokeColor(rgb(ivory, 0.05 + 0.04 * CGFloat(0.5 + 0.5 * sin(t + phase))))
    ctx.setLineWidth(1)
    ctx.addPath(path)
    ctx.strokePath()
  }

  // Vignette
  let vg = CGGradient(colorsSpace: space, colors: [rgb(0x000000, 0), rgb(0x000000, 0.5)] as CFArray, locations: [0.5, 1])!
  ctx.drawRadialGradient(vg, startCenter: CGPoint(x: w / 2, y: h / 2), startRadius: 0,
                         endCenter: CGPoint(x: w / 2, y: h / 2), endRadius: max(w, h) * 0.75, options: [.drawsAfterEndLocation])
  ctx.restoreGState()
}

func makeContext() -> CGContext {
  CGContext(data: nil, width: W, height: H, bitsPerComponent: 8, bytesPerRow: W * 4, space: space,
            bitmapInfo: CGImageAlphaInfo.premultipliedFirst.rawValue | CGBitmapInfo.byteOrder32Little.rawValue)!
}

// Poster (frame 0 is identical to the loop start)
let posterCtx = makeContext()
drawFrame(posterCtx, 0)
let posterURL = URL(fileURLWithPath: "\(outDir)/\(name.replacingOccurrences(of: "hero-", with: "hero-poster-")).jpg")
let dest = CGImageDestinationCreateWithURL(posterURL as CFURL, UTType.jpeg.identifier as CFString, 1, nil)!
CGImageDestinationAddImage(dest, posterCtx.makeImage()!, [kCGImageDestinationLossyCompressionQuality: 0.82] as CFDictionary)
CGImageDestinationFinalize(dest)

// Video
let url = URL(fileURLWithPath: "\(outDir)/\(name).mp4")
try? FileManager.default.removeItem(at: url)
let writer = try! AVAssetWriter(outputURL: url, fileType: .mp4)
let settings: [String: Any] = [
  AVVideoCodecKey: AVVideoCodecType.h264,
  AVVideoWidthKey: W, AVVideoHeightKey: H,
  AVVideoCompressionPropertiesKey: [
    AVVideoAverageBitRateKey: W * H * 3 / 2,
    AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
    AVVideoMaxKeyFrameIntervalKey: 48,
  ],
]
let input = AVAssetWriterInput(mediaType: .video, outputSettings: settings)
input.expectsMediaDataInRealTime = false
let adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: input, sourcePixelBufferAttributes: [
  kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA,
  kCVPixelBufferWidthKey as String: W, kCVPixelBufferHeightKey as String: H,
])
writer.add(input)
writer.shouldOptimizeForNetworkUse = true
writer.startWriting()
writer.startSession(atSourceTime: .zero)

for f in 0..<frames {
  while !input.isReadyForMoreMediaData { usleep(1000) }
  var pb: CVPixelBuffer?
  CVPixelBufferPoolCreatePixelBuffer(nil, adaptor.pixelBufferPool!, &pb)
  let buf = pb!
  CVPixelBufferLockBaseAddress(buf, [])
  let ctx = CGContext(data: CVPixelBufferGetBaseAddress(buf), width: W, height: H, bitsPerComponent: 8,
                      bytesPerRow: CVPixelBufferGetBytesPerRow(buf), space: space,
                      bitmapInfo: CGImageAlphaInfo.premultipliedFirst.rawValue | CGBitmapInfo.byteOrder32Little.rawValue)!
  drawFrame(ctx, f)
  CVPixelBufferUnlockBaseAddress(buf, [])
  adaptor.append(buf, withPresentationTime: CMTime(value: CMTimeValue(f), timescale: fps))
}
input.markAsFinished()
let sem = DispatchSemaphore(value: 0)
writer.finishWriting { sem.signal() }
sem.wait()
print("wrote \(url.path) status=\(writer.status.rawValue) \(writer.error?.localizedDescription ?? "")")
