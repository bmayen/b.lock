//
//  FAFeedViewMapController.m
//  Freshly
//
//  Created by Mario Gonzalez on 1/5/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import "FAFeedViewMapController.h"
#import <QuartzCore/QuartzCore.h>
#import "Constants.h"

@implementation FAFeedViewMapController
@synthesize mapView=_mapView;
@synthesize isBeingDisplayed=_isBeingDisplayed;
@synthesize selectedAnnotation=_selectedAnnotation;
@synthesize delegate=_delegate;

// default initializer
- (id)initWithMapView:(MKMapView*)aMapView {
    self = [super init];
    if (self) {
        self.mapView = aMapView;
        [self setMapSizeWidth:3000 andHeight:3000];
        [self setPinDelta:CGPointMake(10, 2.002)];
        [self.mapView setDelegate: self];
        [self.mapView setOpaque:YES];
    }
    return self;
}

- (void)dealloc {
    self.delegate = nil;
    self.mapView = nil;
    self.selectedAnnotation = nil;
}

#pragma mark -
#pragma mark Configuration
-(void)setAllowScroll:(BOOL)shouldAllowScroll andAllowZoom:(BOOL)shouldAllowZoom {
    _mapView.scrollEnabled = shouldAllowScroll;
    _mapView.zoomEnabled = shouldAllowZoom;
}

-(void)setMapSizeWidth:(int)aWidth andHeight:(int)aHeight {
    mapSize = MKMapSizeMake(aWidth + 1000, aHeight+1000);
}

-(void)setPinDelta:(CGPoint)aDelta {
    pinDelta = aDelta;
}

#pragma mark -
#pragma mark Annotation Convinience Methods
-(void)removeAllAnnotations {
    [_mapView removeAnnotations:_mapView.annotations];
}

-(void)addAnnotation:(id <MKAnnotation>)anAnnotation andShouldPreselect:(BOOL)shouldPreselect withSubtitle:(NSString *)aSubtitle withDisclosure:(BOOL)showDisclosure {
//    anAnnotation.subtitle = aSubtitle;
    [self addAnnotation:anAnnotation andShouldPreselect:shouldPreselect withDisclosure:showDisclosure];
}

-(void)addAnnotation:(id <MKAnnotation>)anAnnotation andShouldPreselect:(BOOL)shouldPreselect withDisclosure:(BOOL)showDisclosure {
    
    // Move the map to location where annotation is
    CLLocationCoordinate2D location = CLLocationCoordinate2DMake( anAnnotation.coordinate.latitude + pinDelta.x, anAnnotation.coordinate.longitude+pinDelta.y);
//    MKCoordinateSpan span = {0.02, 0.02};
//    MKCoordinateRegion region = MKCoordinateRegionMake(location, span);
    
    MKMapRect mapRect = self.mapView.visibleMapRect;
    mapRect.origin = MKMapPointForCoordinate( location );
    mapRect.size = mapSize;
    
    CGRect rect;
    rect.origin.x = mapRect.origin.x;   
    rect.origin.y = mapRect.origin.y;
    rect.size.width = mapRect.size.width;
    rect.size.height = mapRect.size.height;
    
    [self.mapView setVisibleMapRect:mapRect animated:YES];
    
    // Set to preselect for later
    if(shouldPreselect) {
        self.selectedAnnotation = anAnnotation;
    }
   
    if( [anAnnotation respondsToSelector:@selector(enableDisclosure)] ) {
        if( showDisclosure ) {
            [anAnnotation performSelector:@selector( enableDisclosure ) ];
        } else {
            [anAnnotation performSelector:@selector( hideDisclosure ) ];
        }
    } 

    [_mapView addAnnotation:anAnnotation];
}


-(void)mapView:(MKMapView *)mapView didAddAnnotationViews:(NSArray *)annotationViews {
    
    
    for(MKAnnotationView *view in annotationViews) {        
        if(view.annotation == self.selectedAnnotation) {
            [view setCanShowCallout:YES];
            view.image = [UIImage imageNamed:[NSString stringWithFormat:@"map_smTag.png"]];


            // Has a showDisclosure method
            if( [view.annotation respondsToSelector:@selector(showDisclosure)] 
               && [view.annotation performSelector:@selector(showDisclosure)] ) {
                
                [view setRightCalloutAccessoryView: [UIButton buttonWithType:UIButtonTypeDetailDisclosure] ];
            }
            
            [_mapView selectAnnotation:self.selectedAnnotation animated:YES];
        }
        
        // Animate
        CGRect endFrame = view.frame;
        CGRect startFrame = endFrame;
        startFrame.origin.x = view.center.x;
        startFrame.origin.y += 10;
        startFrame.size.width = 0;
        startFrame.size.height = 0;
//        view.frame = startFrame;
        
        [UIView beginAnimations: nil context: nil];
        [UIView setAnimationDuration: 0.1];
//        [UIView setAnimationDelay:0.4];
        [UIView setAnimationCurve:UIViewAnimationCurveEaseOut];
//            view.frame = endFrame;
        [UIView commitAnimations];
        

//        CATransition* theTransition = [CATransition animation];
//        theTransition.duration = 0.6;
//        theTransition.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseInEaseOut];
//        theTransition.type = kCATransitionMoveIn; //kCATransitionMoveIn; //, kCATransitionPush, kCATransitionReveal, kCATransitionFade
//        theTransition.subtype = kCATransitionFromTop; //kCATransitionFromLeft, kCATransitionFromRight, kCATransitionFromTop, kCATransitionFromBottom
//        [view.layer addAnimation:theTransition forKey:nil];        
    }
}

- (void)mapView:(MKMapView *)mapView annotationView:(MKAnnotationView *)view calloutAccessoryControlTapped:(UIControl *)control {
    BLKBikeAnnotation* businessAnnotation = (BLKBikeAnnotation *)view.annotation;
    [self.delegate mapController:self didSelectBusinessAnnotation: businessAnnotation ];
}




#pragma mark -
#pragma mark Accessors
-(void)setIsBeingDisplayed:(bool)aValue {
    _isBeingDisplayed = aValue;
}

@end
