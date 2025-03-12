<?php

namespace App\Http\Controllers;

use App\Models\Jobs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Mail\JobPostedNotification;
use Carbon\Carbon;

class JobsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {

            // Fetch XML content from the URL 
            $url = "https://mrge-group-gmbh.jobs.personio.de/xml";
            $response = Http::get($url);

            if ($response->failed()) {
                return response()->json(['error' => "Failed to fetch XML from URL"]);
            }

            // Convert XML to SimpleXMLElement object
            $xmlObject = simplexml_load_string($response->body(), "SimpleXMLElement", LIBXML_NOCDATA);

            if (!$xmlObject) {
                return response()->json(['error' => "Invalid XML format"]);                
            }

            // Convert to JSON and then to an associative array
            $data = json_decode(json_encode($xmlObject), true);
            return response()->json($data);
            
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'email' => 'required|email',
        ]);

        // Check if user has posted before
        $firstTimePoster = !Jobs::where('email', $request->email)->exists();

        $job = Jobs::create([
            'title' => $request->title,
            'description' => $request->description,
            'email' => $request->email,
        ]);

        return response()->json(['message' => 'Job posted successfully!'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function approve($id)
    {
        $job = Jobs::findOrFail($id);
        $job->update(['status' => 'approved']);

        return response()->json(['message' => 'Job approved successfully!']);
    }

    public function markAsSpam($id)
    {
        $job = Jobs::findOrFail($id);
        $job->update(['status' => 'spam']);

        return response()->json(['message' => 'Job marked as spam!']);
    }

    public function fetchNewJobs()
    {
        $newJobs = Jobs::whereIn('email', function ($query) {
            $query->select('email')
                ->from('jobs')
                ->groupBy('email')
                ->havingRaw('COUNT(*) = 1');
        })->get();
    
        return response()->json($newJobs);
    }
}
