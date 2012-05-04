//
//  FAFeedViewMapController.h
//  Freshly
//
//  Created by Mario Gonzalez on 1/5/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <CoreLocation/CoreLocation.h>
#import <MapKit/MapKit.h>
#import "BLKBikeAnnotation.h"


@interface FAFeedViewMapController : NSObject <MKMapViewDelegate> {
    // Mapview we control
    MKMapView *_mapView;
    // Currently selected annotation, can be set when an annotation is added to force it to automatically select it when didAddAnnotations is called
    id <MKAnnotation>  _selectedAnnotation; 
    // Used to check when the map is not being displayed, this is used when the UITableView ask how many rows there are in a section
    bool _isBeingDisplayed;         
    
    // Delegate that conforms to FAFeedViewMapControllerDelegate
    __weak id _delegate;            
    
    // Setable before map is displayed
    MKMapSize mapSize;
    CGPoint pinDelta;
}
@property(nonatomic, retain) MKMapView *mapView;
@property(strong, nonatomic) id<MKAnnotation> selectedAnnotation;
@property(nonatomic, assign) bool isBeingDisplayed;
@property(weak) id delegate;

// Designated initalizer
- (id)initWithMapView:(MKMapView*)aMapView;


#pragma mark -
#pragma mark Configuration
-(void)setAllowScroll:(BOOL)shouldAllowScroll andAllowZoom:(BOOL)shouldAllowZoom;
-(void)setMapSizeWidth:(int)aWidth andHeight:(int)aHeight;
-(void)setPinDelta:(CGPoint)aDelta;

#pragma mark -
#pragma mark Annotation Convinience Methods
-(void)removeAllAnnotations;
-(void)addAnnotation:(id <MKAnnotation>)anAnnotation andShouldPreselect:(BOOL)shouldPreselect withDisclosure:(BOOL)showDisclosure;
-(void)addAnnotation:(id <MKAnnotation>)anAnnotation andShouldPreselect:(BOOL)shouldPreselect withSubtitle:(NSString *)aSubtitle withDisclosure:(BOOL)showDisclosure;
-(void)addAnnotation:(id <MKAnnotation>)anAnnotation andShouldPreselect:(BOOL)shouldPreselect withSubtitle:(NSString *)aSubtitle withDisclosure:(BOOL)showDisclosure;
@end

#pragma mark -
#pragma mark FAFeedViewMapControllerDelegate
@protocol FAFeedViewMapControllerDelegate <NSObject>
- (void)mapController:(FAFeedViewMapController *)mapController didSelectBusinessAnnotation:(BLKBikeAnnotation *)businessAnnotation;
@end

